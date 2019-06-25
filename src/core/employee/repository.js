const Employee = require('../../models/employeeModel');

module.exports = {
    getEmployee,
    getEmployeeStates,
    getEmployeeByCpf,
    insertEmployee,
    updateEmployee,
    deleteEmployee
};

async function getEmployee(filter, page) {
    const totalRows = await Employee.find(filter).countDocuments();

    const employees = await Employee.find(filter)
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ nome: 1 });

    return {
        list: employees,
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

async function getEmployeeByCpf(employeeCpf) {
    const employee = await Employee.findOne({ cpf: employeeCpf });

    if (!employee) {
        throw {
            statusCode: 404,
            message: 'Funcionário não encontrado'
        };
    }

    return employee;
}

async function insertEmployee(data) {
    const employee = await Employee.findOne({ cpf: data.cpf });

    if (employee) {
        throw {
            statusCode: 401,
            message: 'CPF já cadastrado'
        };
    }

    const newEmployee = await Employee.create(data);

    return newEmployee._id;
}

async function updateEmployee(data) {
    const employee = await Employee.findOne({ cpf: data.employeeCpf });

    if (!employee) {
        throw {
            statusCode: 404,
            message: 'Funcionário não encontrado'
        };
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
        { cpf: data.employeeCpf },
        data,
        { new: true }
    );

    return updatedEmployee;
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
