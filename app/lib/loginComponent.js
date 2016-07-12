import UserRepo from './userRepo';
import User from '../models/user';

export default class LoginComponent {

  constructor(context) {
    this.loggedInUsers = [];
    this.context = context;
  }

  login(name) {
    const userRepo = new UserRepo(this.context);
    return new Promise((res, rej) => {
      userRepo.getUser(name)
      .then(user => {
        if (user) {
          return Promise.resolve(user);
        }
        user = new User(name);
        return userRepo.registerUser(user);
      })
      .then(user => {
        this.loggedInUsers.push(user);
        res(user);
      })
      .catch(rej);
    });
  }
}
