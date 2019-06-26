const employeeService = require('../../src/core/employee/service');

describe('EmployeeService tests', () => {
    it('should remove empty properties from the object', () => {
        const query = {
            page: 1,
            nome: null,
            cpf: null,
            cargo: null,
            dataCad: null,
            status: 'ATIVO',
            salarioMin: 5000,
            salarioMax: null,
        };

        const expectedQuery = {
            page: 1,
            status: 'ATIVO',
            salarioMin: 5000,
        };

        const formattedQuery = employeeService.formatFilter(query);

        expect(formattedQuery).toEqual(expectedQuery);
    });

    it('should return a filter prepared to mongodb', () => {
        const query = {
            page: 1,
            nome: 'Teste',
            cpf: '12345678909',
            cargo: 'Dev Jr',
            dataCad: '2017-04-15',
            status: 'ATIVO',
            salarioMin: 5000,
            salarioMax: 8000,
        };

        const expectedFilter = {
            page: 1,
            nome: { $regex: 'Teste', $options: 'i' },
            cpf: '12345678909',
            cargo: 'Dev Jr',
            dataCad: new Date('2017-04-15').toISOString(),
            status: 'ATIVO',
            salario: {
                $gte: 5000,
                $lte: 8000,
            },
        };

        const generatedFilter = employeeService.generateFilter(query);

        expect(generatedFilter).toEqual(expectedFilter);
    });
});
