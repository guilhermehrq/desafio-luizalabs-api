const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        dataCad: Date,
        cargo: String,
        cpf: String,
        nome: String,
        ufNasc: String,
        salario: Number,
        status: String
    },
    { collection: 'employee' }
);

module.exports = mongoose.model('Employee', schema);
