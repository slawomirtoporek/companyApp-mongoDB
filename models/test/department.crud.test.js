const expect = require('chai').expect;
const mongoose = require('mongoose');
const Department = require('../department.model');

describe('Department', () => {

  after(() => {
    mongoose.models = {};
  });
});