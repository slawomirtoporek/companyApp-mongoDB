const expect = require('chai').expect;
const mongoose = require('mongoose');
const Department = require('../department.model');

describe('Department', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  after(() => {
    mongoose.models = {};
  });
});