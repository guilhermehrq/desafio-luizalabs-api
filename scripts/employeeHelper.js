const fs = require('fs');
const { promisify } = require('util');

module.exports = {
    getEmployeeList,
    generateEmployeeObject,
    formatDate
};

/**
 * Processa o arquivo "funcionarios.txt" e trata todas as linhas
 * retornando um array de objetos com informações dos funcionários
 * @returns {Array}
 */
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

/**
 * Recebe a linha contendo informações do funcionário
 * trata esta linha e retorna os dados separados de acordo com a model "employeeModel.js"
 * @param {String} line
 * @returns {Object}
 */
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

/**
 * Formata e trata uma dateString retornando em formato de Data
 * @param {String} dateString
 * @returns {Date}
 */
function formatDate(dateString) {
    const date = dateString
        .split('/')
        .reverse()
        .join('-');

    return new Date(date);
}
