module.exports = {
    validateFilters,
    isDate
};

/**
 * Recebe a query passada para a rota e valida os campos necessários
 * retornando um um array de erros caso seja encontrado falhas
 * @param {Object} query
 */
async function validateFilters(query) {
    const errors = [];

    const { dataCad, status, salarioInicial, salarioFinal } = query;

    if (dataCad && !isDate(dataCad)) {
        errors.push(`dataCad: ${dataCad} não é uma data válida!`);
    }

    if (status && !['ATIVO', 'BLOQUEADO', 'INATIVO'].includes(status)) {
        errors.push(
            `status: ${status} não é um status válido. Pode ser apenas ATIVO, BLOQUEADO OU INATIVO.`
        );
    }

    if (salarioInicial && salarioFinal && salarioInicial > salarioFinal) {
        errors.push('salarioIncial deve ser menor que o salarioFinal!');
    }

    if (errors.length) {
        throw {
            message: errors,
            statusCode: 400
        };
    }
}

/**
 * Verifica se uma data é válida
 * @param {String} date
 * @returns {boolean}
 */
function isDate(date) {
    const objectDate = new Date(date);

    return objectDate !== 'Invalid Date' && !isNaN(objectDate);
}
