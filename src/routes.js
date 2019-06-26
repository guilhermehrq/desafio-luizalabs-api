const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const employee = require('./core/employee/controller');

module.exports = (app) => {
    app.route('/ping').get((req, res) => {
        res.status(200).json({
            message: new Date(),
        });
    });

    app.route('/employee')
        .get(employee.getEmployees)
        .post(employee.insertEmployee);

    app.route('/employee/:employeeId')
        .get(employee.getEmployeeById)
        .put(employee.updateEmployee)
        .delete(employee.deleteEmployee);

    app.route('/employee-states').get(employee.getEmployeeStates);

    // Inclui rota para a documentação do Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
