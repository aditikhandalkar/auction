export default class AuctionRepo {
  constructor(context) {
    this.context = context;
    this.tableName = 'auction';
  }

  createAuction(auction) {
    return new Promise((res, rej) => {
      this.context(this.tableName)
      .insert(auction)
      .then(id => {
        res(id);
      })
      .catch(rej);
    });
  }

  closeAuction() {

  }
}
