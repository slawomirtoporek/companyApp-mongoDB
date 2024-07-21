const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('../employee.model.js');

describe('Employee', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  after(() => {
    mongoose.models = {};
  });
});