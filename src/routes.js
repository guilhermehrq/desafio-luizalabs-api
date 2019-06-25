const employee = require('./core/employee/controller');

module.exports = app => {
    app.route('/ping').get((req, res) => {
        res.status(200).json({
            message: new Date()
        });
    });

    app.route('/employee').get(employee.getEmployees);

    app.route('/employee/:employeeCpf').delete(employee.deleteEmployee);

    app.route('/employee-states').get(employee.getEmployeeStates);
};
