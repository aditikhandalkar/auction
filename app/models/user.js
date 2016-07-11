export default class User {
  constructor(props) {
    this.name = props.name || '';
    this.coins = 1000;
    this.breads = 30;
    this.carrots = 18;
    this.diamonds = 1;
  }

  getObject() {
    return {
      name: this.name,
      coins: this.coins,
      breads: this.breads,
      carrots: this.carrots,
      diamonds: this.diamonds
    };
  }
}
