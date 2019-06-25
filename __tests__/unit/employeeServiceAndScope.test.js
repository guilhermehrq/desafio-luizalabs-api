const employeeService = require('../../src/core/employee/service');
const employeeScope = require('../../src/core/employee/scope');

describe('EmployeeService tests', () => {
    it('should remove empty properties from the object', () => {
        const query = {
            page: 1,
            nome: null,
            cpf: null,
            cargo: null,
            dataCad: null,
            status: 'ATIVO',
            salarioInicial: 5000,
            salarioFinal: null,
        };

        const expectedQuery = {
            page: 1,
            status: 'ATIVO',
            salarioInicial: 5000,
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
            salarioInicial: 5000,
            salarioFinal: 8000,
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

describe('employeeScope tests', () => {
    it('should pass a query in the validate and verify the results - this case pass', async (done) => {
        const query = {
            page: 1,
            nome: 'Teste',
            cpf: '12345678909',
            cargo: 'Dev Jr',
            dataCad: '2017-04-15',
            status: 'ATIVO',
            salarioInicial: 5000,
            salarioFinal: 8000,
        };

        const isValid = await employeeScope.validateFilters(query);
        expect(isValid).toBeUndefined();
        done();
    });

    it('should pass a query in the validate and verify the results - this case return errors', async (done) => {
        const expectedError = [
            'status: FALECIDO não é um status válido. Pode ser apenas ATIVO, BLOQUEADO OU INATIVO.',
            'salarioIncial deve ser menor que o salarioFinal!',
        ];

        try {
            const query = {
                page: 1,
                nome: 'Teste',
                cpf: '12345678909',
                cargo: 'Dev Jr',
                dataCad: '2017-04-15',
                status: 'FALECIDO',
                salarioInicial: 8000,
                salarioFinal: 5000,
            };

            await employeeScope.validateFilters(query);
        } catch (e) {
            expect(e).toEqual(expectedError);
        }

        done();
    });
});
