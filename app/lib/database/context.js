import {config} from './config';
import knex from 'knex';

let instance;

export default class Context {
  constructor() {
    if (!instance) {
      instance = knex(config);
    }
    return instance;
  }
}
