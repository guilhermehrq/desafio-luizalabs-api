const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        dataCad: { type: Date, required: true },
        cargo: { type: String, required: true },
        cpf: { type: String, required: true },
        nome: { type: String, required: true },
        ufNasc: { type: String, required: true },
        salario: { type: Number, required: true },
        status: { type: String, required: true }
    },
    { collection: 'employee' }
);

module.exports = mongoose.model('Employee', schema);
