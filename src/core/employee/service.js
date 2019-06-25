module.exports = {
    generateFilter,
    formatFilter
};

/**
 * Recebe todos os filtros e coloca na estrutura própia para os filtros do mongo
 * @param {Object} data
 * @returns {Object}
 */
function generateFilter(data) {
    const filter = formatFilter(data);

    if (filter.dataCad) {
        filter.dataCad = new Date(filter.dataCad).toISOString();
    }

    if (filter.salarioInicial || filter.salarioFinal) {
        filter.salario = {};

        if (filter.salarioInicial) {
            filter.salario.$gte = filter.salarioInicial;
        }

        if (filter.salarioFinal) {
            filter.salario.$lte = filter.salarioFinal;
        }

        delete filter.salarioInicial;
        delete filter.salarioFinal;
    }

    if (filter.nome) {
        filter.nome = { $regex: filter.nome, $options: 'i' };
    }

    return filter;
}

/**
 * Remove todos os filtros vazios do objeto
 * @param {Object} filter
 * @return {Object}
 */
function formatFilter(filter) {
    Object.keys(filter).forEach(key => {
        if (!filter[key]) {
            delete filter[key];
        }
    });

    return filter;
}
