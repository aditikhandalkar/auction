import UserRepo from './userRepo';

export default class SettlementComponent {
  constructor(context, io) {
    this.repo = new UserRepo(context);
    this.io = io;
  }

  settle(auction) {
    return new Promise((res, rej) => {
      console.log(auction);
      if (auction.itemValue === 0) {
        res();
        return;
      }

      let buyer;
      let seller;
      this.repo.getUser(auction.buyerName)
      .then(user => {
        buyer = user;
        const itemName = `${auction.itemName}s`;
        user[itemName] += auction.itemQuantity;
        return this.repo.updateItem({
          userName: auction.buyerName,
          itemName,
          itemValue: user[itemName]
        });
      })
      .then(() => {
        buyer.coins -= auction.itemValue;
        return this.repo.updateItem({
          userName: auction.buyerName,
          itemName: 'coins',
          itemValue: buyer.coins
        });
      })
      .then(() => this.repo.getUser(auction.sellerName))
      .then(user => {
        seller = user;
        const itemName = `${auction.itemName}s`;
        user[itemName] -= auction.itemQuantity;
        return this.repo.updateItem({
          userName: auction.sellerName,
          itemName,
          itemValue: user[itemName]
        });
      })
      .then(() => {
        seller.coins += auction.itemValue;
        return this.repo.updateItem({
          userName: auction.sellerName,
          itemName: 'coins',
          itemValue: seller.coins
        });
      })
      .then(() => {
        this.io.emit('setUser', buyer);
        this.io.emit('setUser', seller);
        res();
      })
      .catch(rej);
    });
  }
}
