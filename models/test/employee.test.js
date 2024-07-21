const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('../employee.model.js');

describe('Employee', () => {

  it('should throw an error if no "name" arg', async () => {
    const emp = new Employee({});

    emp.validateSync(err => {
      expect(err.errors.name).to.exist;
    });  
  });

  it('should throw an error if firstName is not a string', () => {
    const cases = [
        {firstName: [], lastName: 'Doe', department: 'marketing'},
        {firstName: {}, lastName: 'Doe', department: 'marketing'},
    ];

    for(let dataFirstName of cases) {
      const emp = new Employee(dataFirstName);

      emp.validateSync(err => {
        expect(error).to.exist;
      });  
    }
  });

  after(() => {
    mongoose.models = {};
  });
});