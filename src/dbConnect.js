const mongoose = require('mongoose');

mongoose
    .connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
            process.env.DB_HOST
        }/${process.env.DB_NAME}`,
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log('Mongo connection established');
    })
    .catch(e => {
        throw err;
    });
