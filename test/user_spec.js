import {describe, it, before} from 'mocha';
import chai from 'chai';
import User from '../app/server/models/user';

const should = chai.should();

describe('models', () => {
  describe('user', () => {
    let user;
    before(() => {
      user = new User('vijay');
    });
    it('has name', () => {
      should.exist(user.name);
    });
    it('name is correct', () => {
      user.name.should.equal('vijay');
    });
    it('coins default to 1000', () => {
      user.coins.should.equal(1000);
    });
    it('breads default to 30', () => {
      user.breads.should.equal(30);
    });
    it('carrots default to 18', () => {
      user.carrots.should.equal(18);
    });
    it('diamonds default to 1', () => {
      user.diamonds.should.equal(1);
    });
    it('has no password', () => {
      should.not.exist(user.password);
    });
  });
});
