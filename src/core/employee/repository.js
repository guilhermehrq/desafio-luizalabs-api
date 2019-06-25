const Employee = require('../../models/employeeModel');

module.exports = {
    getEmployee,
    getEmployeeStates,
    deleteEmployee
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

async function getEmployeeStates() {
    const data = await Employee.aggregate([
        {
            $group: {
                _id: '$ufNasc',
                count: { $sum: 1 }
            }
        }
    ]).sort({ count: -1 });

    return data;
}

async function deleteEmployee(employeeCpf) {
    const employee = await Employee.findOne({ cpf: employeeCpf });

    if (!employee) {
        throw {
            statusCode: 404,
            message: 'Funcionário não encontrado'
        };
    }

    await Employee.findOneAndDelete({ cpf: employeeCpf });

    return true;
}
