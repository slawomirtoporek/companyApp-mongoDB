const expect = require('chai').expect;
const mongoose = require('mongoose');
const Department = require('../department.model.js');

describe('Department', () => {

  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validateSync(err => {
      expect(err.errors.name).to.exist;
    });  
  });

  after(() => {
    mongoose.models = {};
  });
});