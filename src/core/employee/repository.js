const Employee = require('../../models/employeeModel');
const service = require('./service');

module.exports = {
    getEmployee,
    getEmployeeStates,
    getEmployeeById,
    insertEmployee,
    updateEmployee,
    deleteEmployee,
};

async function getEmployee(params, page) {
    const filters = service.generateFilter(params);

    const totalRows = await Employee.find(filters).countDocuments();

    const employees = await Employee.find(filters)
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ nome: 1 });

    return {
        list: employees,
        totalRows,
    };
}

async function getEmployeeStates() {
    const data = await Employee.aggregate([
        {
            $group: {
                _id: '$ufNasc',
                count: { $sum: 1 },
            },
        },
    ]).sort({ count: -1 });

    return data;
}

async function getEmployeeById(employeeId) {
    const employee = await Employee.findOne({ cpf: employeeId });

    if (!employee) {
        throw {
            statusCode: 404,
            message: 'Funcionário não encontrado',
        };
    }

    return employee;
}

async function insertEmployee(data) {
    const employee = await Employee.findOne({ cpf: data.cpf });

    const registerDate = new Date().toISOString().split('T');
    data.dataCad = `${registerDate[0]}T00:00:00.000Z`;

    if (employee) {
        throw {
            statusCode: 401,
            message: 'CPF já cadastrado',
        };
    }

    const newEmployee = await Employee.create(data);

    return newEmployee._id;
}

async function updateEmployee(data) {
    const employee = await Employee.findOne({ cpf: data.employeeId });

    if (!employee) {
        throw {
            statusCode: 404,
            message: 'Funcionário não encontrado',
        };
    }

    const updatedEmployee = await Employee.findOneAndUpdate({ cpf: data.employeeId }, data, {
        new: true,
    });

    return updatedEmployee;
}

async function deleteEmployee(employeeId) {
    const employee = await Employee.findOne({ cpf: employeeId });

    if (!employee) {
        throw {
            statusCode: 404,
            message: 'Funcionário não encontrado',
        };
    }

    await Employee.findOneAndDelete({ cpf: employeeId });

    return true;
}
