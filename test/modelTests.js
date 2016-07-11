import {describe, it, before} from 'mocha';
import chai from 'chai';
import User from '../app/models/user';

const should = chai.should();

describe('models', () => {
  describe('user', () => {
    let user;
    before(() => {
      user = new User({name: 'vijay'});
    });
    it('has name', () => {
      should.exist(user.name);
    });
    it('name is correct', () => {
      user.name.should.equal('vijay');
    });
    it('has no password', () => {
      should.not.exist(user.password);
    });
  });
});
