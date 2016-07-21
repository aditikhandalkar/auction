import AuctionRepo from './auctionRepo';
import SettlementComponent from './settlementComponent';

export default class AuctionComponent {
  constructor(context, io) {
    this.repo = new AuctionRepo(context);
    this.context = context;
    this.io = io;
    this.auctions = [];
    this.currentAuction = null;
    this.timeRemaining = 0;
    this.closeAuction = this.closeAuction.bind(this);
  }

  queueAuction(auction) {
    return new Promise((res, rej) => {
      this.repo
      .createAuction(auction)
      .then(id => {
        auction.id = id;
        this.auctions.push(auction);
        this.tryStartAuction();
        res(id);
      })
      .catch(rej);
    });
  }

  placeBid(bid) {
    return new Promise((res, rej) => {
      this.repo.placeBid(bid)
      .then(() => {
        this.currentAuction.buyerName = bid.buyerName;
        this.currentAuction.itemValue = bid.itemValue;
        if (this.timeRemaining < 10) {
          this.timeRemaining += 10;
        }
        this.io.emit('newBid', bid);
        res();
      })
      .catch(rej);
    });
  }

  getAuction() {
    return this.currentAuction ?
    Promise.resolve(this.currentAuction) :
    Promise.reject('No auction available');
  }

  closeAuction() {
    const settlementComponent = new SettlementComponent(this.context, this.io);
    settlementComponent.settle(this.currentAuction)
    .then(() => {
      this.currentAuction = null;
      this.tryStartAuction();
    })
    .catch(console.log);
  }

  tryStartAuction(auction) {
    if (!this.currentAuction) {
      if (this.auctions.length > 0) {
        this.currentAuction = this.auctions.splice(0, 1)[0];
        this.timeRemaining = 90;
        const handle = setInterval(() => {
          this.timeRemaining -= 1;
          console.log(this.timeRemaining);
          this.io.emit('setTime', {time: this.timeRemaining});
          if (this.timeRemaining === 0) {
            this.closeAuction();
            clearInterval(handle);
          }
        }, 1000);
        this.io.emit('newAuction', this.currentAuction);
      }
    }
  }
}
