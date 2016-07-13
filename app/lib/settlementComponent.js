import UserRepo from './userRepo';

export default class SettlementComponent {
  constructor(context) {
    this.repo = new UserRepo(context);
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
        let itemValue = user[itemName];
        console.log(itemValue);
        itemValue += auction.itemQuantity;
        return this.repo.updateItem({
          userName: auction.buyerName,
          itemName,
          itemValue
        });
      })
      .then(() => {
        const itemName = 'coins';
        const itemValue = buyer.coins - auction.itemValue;
        return this.repo.updateItem({
          userName: auction.buyerName,
          itemName,
          itemValue
        });
      })
      .then(() => this.repo.getUser(auction.sellerName))
      .then(user => {
        seller = user;
        const itemName = `${auction.itemName}s`;
        let itemValue = user[itemName];
        console.log(itemValue);
        itemValue -= auction.itemQuantity;
        return this.repo.updateItem({
          userName: auction.sellerName,
          itemName,
          itemValue
        });
      })
      .then(() => {
        const itemName = 'coins';
        const itemValue = seller.coins + auction.itemValue;
        return this.repo.updateItem({
          userName: auction.sellerName,
          itemName,
          itemValue
        });
      })
      .then(() => {
        // io communications
        res();
      })
      .catch(rej);
    });
  }
}
