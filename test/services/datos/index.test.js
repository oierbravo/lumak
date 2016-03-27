'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('datos service', () => {
  it('registered the datos service', () => {
    assert.ok(app.service('datos'));
  });
});
