import AuctionRepo from './auctionRepo';

export default class AuctionComponent {
  constructor(context) {
    this.repo = new AuctionRepo(context);
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
        if (this.timeRemaining < 10) {
          this.timeRemaining += 10;
        }
        // notify about the bid
        res();
      })
      .catch(rej);
    });
  }

  closeAuction(auction) {
    // transfer balances.
    this.currentAuction = null;
    this.tryStartAuction();
  }

  tryStartAuction(auction) {
    if (!this.currentAuction) {
      if (this.auctions.length > 0) {
        this.currentAuction = this.auctions.splice(0, 1)[0];
        this.timeRemaining = 90;
        const handle = setInterval(() => {
          this.timeRemaining -= 1;
          console.log(this.timeRemaining);
          // notify all.
          if (this.timeRemaining === 0) {
            this.closeAuction();
            clearInterval(handle);
          }
        }, 1000);
        // notify about the auction
      }
    }
  }
}
