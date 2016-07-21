export default class User {
  constructor(name) {
    this.name = name || '__default';
    this.coins = 1000;
    this.breads = 30;
    this.carrots = 18;
    this.diamonds = 1;
  }
}
