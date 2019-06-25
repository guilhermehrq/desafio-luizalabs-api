const repository = require('./repository');
const service = require('./service');
const scope = require('./scope');

module.exports = {
    getEmployees,
    getEmployeeStates,
    deleteEmployee
};

function handleError(res, e) {
    res.status(e.statusCode || 500).json({
        message: e.message || 'Falha ao processar requisição'
    });
}

async function getEmployees(req, res) {
    try {
        const params = {
            page: req.query.page || 1,
            nome: req.query.nome || null,
            cpf: req.query.cpf || null,
            cargo: req.query.cargo || null,
            dataCad: req.query.dataCad || null,
            status: req.query.status || null,
            salarioInicial: req.query.salarioInicial || null,
            salarioFinal: req.query.salarioFinal || null
        };

        await scope.validateFilters(params);

        const filters = service.generateFilter(params);

        const data = await repository.getEmployee(filters);

        res.status(200).json({
            content: data
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getEmployeeStates(req, res) {
    try {
        const data = await repository.getEmployeeStates();

        res.status(200).json({
            content: data
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function deleteEmployee(req, res) {
    try {
        await repository.deleteEmployee(req.params.employeeCpf);

        res.status(200).json({
            content: 'Funcionário excluído com sucesso!'
        });
    } catch (e) {
        return handleError(res, e);
    }
}
