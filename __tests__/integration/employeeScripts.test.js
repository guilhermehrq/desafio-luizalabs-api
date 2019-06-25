require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const mongoose = require('mongoose');
const employeeService = require('../../scripts/employeeService');
const Employee = require('../../src/models/employeeModel');

beforeAll(async done => {
    await mongoose.connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
            process.env.DB_HOST
        }/${process.env.DB_NAME}`,
        {
            useNewUrlParser: true
        }
    );
    done();
});

describe('EmployeeService integration test', () => {
    it('should drop the database, execute the populate script and then verify if any document was inserted', async () => {
        await mongoose.connection.db.dropDatabase();

        await employeeService();

        const data = await Employee.find();

        expect(data.length).toBeGreaterThan(0);
    });
});

afterAll(async done => {
    await mongoose.disconnect();
    done();
});