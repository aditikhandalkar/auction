export default class User {
  constructor(props) {
    this.name = props.name || '';
    this.coins = 1000;
    this.breads = 30;
    this.carrots = 18;
    this.diamonds = 1;
  }
}
