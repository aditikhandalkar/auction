import {describe, it} from 'mocha';
import {should} from 'chai';
import Greeting from '../app/lib/greeting';

should();

describe('greeting', () => {
  describe('sayHello', () => {
    it('should say hello', () => {
      const greeting = new Greeting();
      const text = greeting.getGreeting();
      text.should.equal('Hello world');
    });
  });
});
