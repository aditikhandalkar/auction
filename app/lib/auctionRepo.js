export default class AuctionRepo {
  constructor(context) {
    this.context = context;
    this.tableName = 'auction';
  }

  createAuction(auction) {
    return new Promise((res, rej) => {
      this.context(this.tableName)
      .insert(auction)
      .then(ids => {
        res(ids[0]);
      })
      .catch(rej);
    });
  }

  placeBid(bid) {
    return new Promise((res, rej) => {
      this.context(this.tableName)
      .where({
        id: bid.id
      })
      .update({
        buyerName: bid.buyerName,
        itemValue: bid.itemValue
      })
      .then(res)
      .catch(rej);
    });
  }
}
