import {describe, it, before, after} from 'mocha';
import chai from 'chai';
import Context from '../app/server/lib/database/context';
import User from '../app/server/models/user';
import UserRepo from '../app/server/lib/userRepo';

const should = chai.should();

describe('lib', () => {
  describe('userRepo', () => {
    let context;
    let repo;
    before(() => {
      context = new Context();
      repo = new UserRepo(context);
    });
    it('repo exists', () => {
      should.exist(repo);
    });
    it('register user', done => {
      const user = new User('vijay');
      repo.registerUser(user)
      .then(user => {
        should.exist(user);
        done();
      });
    });
    after(() => {
      context.destroy();
    });
  });
});
