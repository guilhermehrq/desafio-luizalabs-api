require('dotenv').config({
    path: '.env'
});

const mongoose = require('mongoose');
const Employee = require('../src/models/employeeModel');
const employeeHelper = require('./employeeHelper');

module.exports = async () => {
    try {
        console.log('Dropping database...');
        await mongoose.connection.db.dropDatabase();

        console.log('Waiting employees...');
        const employees = await employeeHelper.getEmployeeList();

        console.log('Inserting employees...');
        await Employee.insertMany(employees);

        console.log(`${employees.length} documents inserted with success!`);
    } catch (e) {
        throw e;
    }
};
