'use strict';
const arduino = require('lumak-simple');
const datos = require('./datos');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(datos);
  app.configure(arduino);
};
