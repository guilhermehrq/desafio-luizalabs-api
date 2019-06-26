const validate = require('../../helper/validate');

module.exports = {
    getEmployees,
    getEmployeeById,
    insertEmployee,
    updateEmployee,
    deleteEmployee,
    validateFilters,
};

async function getEmployees(params) {
    const validation = {
        nome: {
            string: true,
        },
        cpf: {
            string: true,
        },
        cargo: {
            string: true,
        },
        dataCad: {
            date: true,
        },
        status: {
            string: true,
        },
        salarioMin: {
            number: true,
        },
        salarioMax: {
            number: true,
        },
    };

    try {
        await validate(params, validation);
        await validateFilters(params);
    } catch (error) {
        error.statusCode = 400;
        throw error;
    }
}

async function getEmployeeById(params) {
    const validation = {
        cpf: {
            string: true,
            required: true,
            notNull: true,
        },
    };

    try {
        await validate(params, validation);
    } catch (error) {
        error.statusCode = 400;
        throw error;
    }
}

async function insertEmployee(params) {
    const validation = {
        nome: {
            string: true,
            required: true,
            notNull: true,
        },
        cpf: {
            string: true,
            required: true,
            notNull: true,
        },
        ufNasc: {
            string: true,
            required: true,
            notNull: true,
            maxLength: 2,
        },
        cargo: {
            string: true,
            required: true,
            notNull: true,
        },
        status: {
            string: true,
            required: true,
            notNull: true,
        },
        salario: {
            number: true,
            required: true,
            notNull: true,
        },
    };

    try {
        await validate(params, validation);
        await validateFilters(params);
    } catch (error) {
        error.statusCode = 400;
        throw error;
    }
}

async function updateEmployee(params) {
    const validation = {
        id: {
            string: true,
            required: true,
            notNull: true,
        },
        employeeId: {
            string: true,
            required: true,
            notNull: true,
        },
        nome: {
            string: true,
            required: true,
            notNull: true,
        },
        ufNasc: {
            string: true,
            required: true,
            notNull: true,
            maxLength: 2,
        },
        cargo: {
            string: true,
            required: true,
            notNull: true,
        },
        status: {
            string: true,
            required: true,
            notNull: true,
        },
        salario: {
            number: true,
            required: true,
            notNull: true,
        },
    };

    try {
        await validate(params, validation);
        await validateFilters(params);
    } catch (error) {
        error.statusCode = 400;
        throw error;
    }
}

async function deleteEmployee(params) {
    const validation = {
        cpf: {
            string: true,
            required: true,
            notNull: true,
        },
    };

    try {
        await validate(params, validation);
    } catch (error) {
        error.statusCode = 400;
        throw error;
    }
}

/**
 * Recebe a query passada para a rota e valida os campos necessários
 * retornando um um array de erros caso seja encontrado falhas
 * @param {Object} query
 */
async function validateFilters(query) {
    const errors = [];

    const { status, salarioMin, salarioMax } = query;

    if (status && !['ATIVO', 'BLOQUEADO', 'INATIVO'].includes(status)) {
        errors.push(
            `status: ${status} não é um status válido. Pode ser apenas ATIVO, BLOQUEADO OU INATIVO.`,
        );
    }

    if (salarioMin && salarioMax && salarioMin > salarioMax) {
        errors.push('salarioMin deve ser menor que o salarioMax!');
    }

    if (errors.length) {
        throw errors;
    }
}
