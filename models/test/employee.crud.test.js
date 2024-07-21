const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('../employee.model');

describe('Employee', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
        const testEmpOne = new Employee({ firstName:'Amanda', lastName: 'Doe', department: 'marketing' });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName:'Emma', lastName: 'Cowell', department: 'marketing' });
        await testEmpTwo.save();
    });

    it('should return all the data with find method', async () => {
        const employees = await Employee.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method.', async () => {
        const employee = await Employee.findOne({ firstName: 'Amanda' });
        const expectedEmployee = { firstName:'Amanda', lastName: 'Doe', department: 'marketing' };
        expect(employee.firstName).to.be.equal(expectedEmployee.firstName);
        expect(employee.lastName).to.be.equal(expectedEmployee.lastName);
        expect(employee.department).to.be.equal(expectedEmployee.department);
    });

    after(async () => {
        await Employee.deleteMany();
      });
});

  after(() => {
    mongoose.models = {};
  });
});