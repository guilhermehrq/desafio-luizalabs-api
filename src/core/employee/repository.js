const Employee = require('../../models/employeeModel');

module.exports = {
    getEmployee
};

async function getEmployee(filter) {
    const page = filter.page;
    delete filter.page;

    const totalRows = await Employee.find(filter).countDocuments();

    const data = await Employee.find(filter)
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ nome: 1 });

    return {
        list: data,
        totalRows
    };
}
