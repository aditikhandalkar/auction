import {config} from './config';
import knex from 'knex';

export default class Context {
  constructor() {
    return knex(config);
  }
}
