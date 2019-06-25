const validate = require('../../helper/validate');

module.exports = {
    getEmployees,
    getEmployeeByCpf,
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
        salarioInicial: {
            number: true,
        },
        salarioFinal: {
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

async function getEmployeeByCpf(params) {
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
        employeeCpf: {
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

    const { status, salarioInicial, salarioFinal } = query;

    if (status && !['ATIVO', 'BLOQUEADO', 'INATIVO'].includes(status)) {
        errors.push(
            `status: ${status} não é um status válido. Pode ser apenas ATIVO, BLOQUEADO OU INATIVO.`,
        );
    }

    if (salarioInicial && salarioFinal && salarioInicial > salarioFinal) {
        errors.push('salarioIncial deve ser menor que o salarioFinal!');
    }

    if (errors.length) {
        throw errors;
    }
}
