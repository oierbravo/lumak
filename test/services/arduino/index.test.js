'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('arduino service', () => {
  it('registered the arduinos service', () => {
    assert.ok(app.service('arduinos'));
  });
});
