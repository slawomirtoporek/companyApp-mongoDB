const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('../employee.model.js');

describe('Employee', () => {

  it('should throw an error if no "name" arg', async () => {
    const dep = new Employee({});

    dep.validateSync(err => {
      expect(err.errors.name).to.exist;
    });  
  });

  after(() => {
    mongoose.models = {};
  });
});