import AuctionRepo from './auctionRepo';

export default class AuctionComponent {
  constructor(context) {
    this.repo = new AuctionRepo(context);
    this.auctions = [];
    this.currentAuction = null;
    this.timeRemaining = 0;
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
    this.repo.placeBid(bid);
    // notify about the bid
  }

  closeAuction(auction) {
    this.repo.closeAuction(this.currentAuction);
    // transfer balances.
    this.currentAuction = null;
    this.tryStartAuction();
  }

  tryStartAuction(auction) {
    if (!this.currentAuction) {
      if (this.auctions.length > 0) {
        this.currentAuction = this.auctions.splice(0, 1)[0];
        this.timeRemaining = 90;
        const handle = setInterval(1000, () => {
          this.timeRemaining -= 1;
          // notify all.
          if (this.timeRemaining === 0) {
            this.closeAuction();
            clearInterval(handle);
          }
        });
        // notify about the auction
      }
    }
  }
}
