import {describe, it, before, after} from 'mocha';
import chai from 'chai';
import Context from '../app/server/lib/database/context';

const should = chai.should();

describe('lib', () => {
  describe('context', () => {
    let context;
    before(() => {
      context = new Context();
    });
    it('select users', done => {
      context.from('user')
      .then(rows => {
        should.exist(rows);
        done();
      });
    });
    after(() => {
      context.destroy();
    });
  });
});
