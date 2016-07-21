export default class UserRepo {
  constructor(context) {
    this.context = context;
    this.tableName = 'user';
  }

  registerUser(user) {
    return new Promise((res, rej) => {
      this.context(this.tableName)
      .insert(user)
      .then(id => {
        res(user);
      })
      .catch(rej);
    });
  }

  getUser(name) {
    return new Promise((res, rej) => {
      this.context(this.tableName)
      .where({name: name})
      .select('name', 'coins', 'breads', 'carrots', 'diamonds')
      .then(rows => {
        if (rows.length > 1) {
          rej('More than one user found');
        }
        const user = rows.length === 1 ? rows[0] : null;
        res(user);
      })
      .catch(rej);
    });
  }

  updateItem(order) {
    return new Promise((res, rej) => {
      this.context(this.tableName)
      .where({
        name: order.userName
      })
      .update({
        [order.itemName]: order.itemValue
      })
      .then(res)
      .catch(rej);
    });
  }
}
