require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const mongoose = require('mongoose');
const employeeService = require('./employeeService');

mongoose
    .connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
            process.env.DB_HOST
        }/${process.env.DB_NAME}`,
        {
            useNewUrlParser: true
        }
    )
    .then(async () => {
        console.log('Mongo connection established');

        await employeeService();

        await mongoose.disconnect();
    })
    .catch(e => {
        throw e;
    });
