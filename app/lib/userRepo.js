export default class UserRepo {
  constructor(context) {
    this.context = context;
    this.tableName = 'user';
  }

  addUser(user, cb) {
    this.context(this.tableName)
    .insert(user)
    .then(id => {
      console.log(`user is inserted with ${id}`);
      cb(id);
    });
  }
}
