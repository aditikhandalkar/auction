import app from '../app';

export default class ConfigService {
  static startup() {
    app.factory('config', function() {
      return {
        siteUrl: 'http://localhost:3000'
      };
    });
  }
}
