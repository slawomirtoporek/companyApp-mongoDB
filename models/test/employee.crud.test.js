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

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName:'Amanda', lastName: 'Doe', department: 'marketing' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName:'Amanda', lastName: 'Doe', department: 'marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName:'Emma', lastName: 'Cowell', department: 'marketing' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
        await Employee.updateOne({ firstName: 'Amanda' }, { $set: { firstName:'*Amanda*', lastName: '*Doe*' }});
        const updatedEmployee = await Employee.findOne({ firstName:'*Amanda*' });
        expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
        const employee = await Employee.findOne({ firstName: 'Amanda' });
        employee.firstName = '*Amanda*';
        employee.lastName = '*Doe*';
        await employee.save();

        const updatedEmployee = await Employee.findOne({ firstName: '*Amanda*' });
        expect(updatedEmployee.firstName).to.be.equal('*Amanda*');
        expect(updatedEmployee.lastName).to.be.equal('*Doe*');
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
      const employee = await Employee.find();

      expect(employee[0].firstName).to.be.equal('Updated!');
      expect(employee[1].firstName).to.be.equal('Updated!');
    });


    afterEach(async () => {
      await Employee.deleteMany();
    });  
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName:'Amanda', lastName: 'Doe', department: 'marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName:'Emma', lastName: 'Cowell', department: 'marketing' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName:'Amanda' });
      const removeEmployee = await Employee.findOne({ firstName:'Amanda' });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  after(() => {
    mongoose.models = {};
  });
});