import {describe, it, before, after} from 'mocha';
import chai from 'chai';
import Context from '../app/lib/database/context';
import User from '../app/models/user';
import UserRepo from '../app/lib/userRepo';

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
    it('add user', done => {
      const user = new User({name: 'vijay'});
      repo.addUser(user, id => {
        id.should.be.above(0);
        done();
      });
    });
    after(() => {
      context.destroy();
    });
  });
});
