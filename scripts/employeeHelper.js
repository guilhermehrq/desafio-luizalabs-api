const fs = require('fs');
const { promisify } = require('util');

module.exports = {
    getEmployeeList,
    generateEmployeeObject,
    formatDate
};

async function getEmployeeList() {
    try {
        const employee = [];
        const file = await promisify(fs.readFile)(
            './resources/funcionarios.txt',
            'utf8'
        );

        const lines = file.split('\r\n');

        // Começando com 1 para pular o cabeçalho
        for (let i = 1; i < lines.length; i++) {
            if (lines[i] !== '') {
                const newEmployee = generateEmployeeObject(lines[i]);
                employee.push(newEmployee);
            }
        }

        return employee;
    } catch (e) {
        throw e;
    }
}

function generateEmployeeObject(line) {
    const [dataCad, cargo, cpf, nome, ufNasc, salario, status] = line.split(
        ';'
    );

    return {
        dataCad: formatDate(dataCad),
        cargo,
        cpf,
        nome,
        ufNasc,
        salario: +salario,
        status
    };
}

function formatDate(stringDate) {
    const date = stringDate
        .split('/')
        .reverse()
        .join('-');

    return new Date(date);
}
