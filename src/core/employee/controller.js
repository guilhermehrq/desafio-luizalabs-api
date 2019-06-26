const repository = require('./repository');
const scope = require('./scope');

module.exports = {
    getEmployees,
    getEmployeeStates,
    getEmployeeById,
    insertEmployee,
    updateEmployee,
    deleteEmployee,
};

function handleError(res, error) {
    res.status(error.statusCode || 500).json({
        message: error.message || 'Falha ao processar requisição',
        error,
    });
}

async function getEmployees(req, res) {
    try {
        const params = {
            nome: req.query.nome || null,
            cpf: req.query.cpf || null,
            cargo: req.query.cargo || null,
            dataCad: req.query.dataCad || null,
            status: req.query.status || null,
            salarioMin: req.query.salarioMin || null,
            salarioMax: req.query.salarioMax || null,
        };

        const page = req.query.page || 1;

        await scope.getEmployees(params);

        const data = await repository.getEmployee(params, page);

        res.status(200).json({
            content: data,
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getEmployeeStates(req, res) {
    try {
        const data = await repository.getEmployeeStates();

        res.status(200).json({
            content: data,
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getEmployeeById(req, res) {
    try {
        const params = {
            cpf: req.params.employeeId,
        };

        await scope.getEmployeeById(params);

        const data = await repository.getEmployeeById(params.cpf);

        res.status(200).json({
            content: data,
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function insertEmployee(req, res) {
    try {
        const params = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            ufNasc: req.body.ufNasc,
            cargo: req.body.cargo,
            status: req.body.status,
            salario: req.body.salario,
        };

        await scope.insertEmployee(params);

        const data = await repository.insertEmployee(params);

        res.status(200).json({
            content: data,
            message: 'Funcionário inserido com sucesso!',
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function updateEmployee(req, res) {
    try {
        const params = {
            id: req.body._id,
            employeeId: req.params.employeeId,
            nome: req.body.nome,
            ufNasc: req.body.ufNasc,
            cargo: req.body.cargo,
            status: req.body.status,
            salario: req.body.salario,
        };

        await scope.updateEmployee(params);

        await repository.updateEmployee(params);

        res.status(200).json({
            message: 'Funcionário atualizado com sucesso!',
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function deleteEmployee(req, res) {
    try {
        const params = {
            cpf: req.params.employeeId,
        };

        await scope.deleteEmployee(params);

        await repository.deleteEmployee(params.cpf);

        res.status(200).json({
            content: 'Funcionário excluído com sucesso!',
        });
    } catch (e) {
        return handleError(res, e);
    }
}
