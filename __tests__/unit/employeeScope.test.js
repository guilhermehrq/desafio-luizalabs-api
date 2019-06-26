const employeeScope = require('../../src/core/employee/scope');

describe('employeeScope tests', () => {
    it('should validate getEmployees params', async (done) => {
        const params = {
            nome: 'Test',
            cpf: '111111111',
            cargo: 'Dev',
            dataCad: '2017-04-15',
            status: 'ATIVO',
            salarioInicial: 5000,
            salarioFinal: 8000,
        };

        const ret = await employeeScope.getEmployees(params);

        expect(ret).toBeUndefined();
        done();
    });

    it('should validate getEmployeeById params', async (done) => {
        const params = {
            cpf: '1111111',
        };

        const ret = await employeeScope.getEmployeeById(params);

        expect(ret).toBeUndefined();
        done();
    });

    it('should validate insertEmployee params', async (done) => {
        const params = {
            nome: 'Teste',
            cpf: '111111111',
            ufNasc: 'SP',
            cargo: 'Dev Pl',
            status: 'ATIVO',
            salario: 1500,
        };

        const ret = await employeeScope.insertEmployee(params);

        expect(ret).toBeUndefined();
        done();
    });

    it('should validate updateEmployee params', async (done) => {
        const params = {
            id: '5d129d8d4801cb3349c8049e',
            employeeId: '11111111',
            nome: 'Anderson Teste',
            ufNasc: 'RJ',
            cargo: 'Dev Jr',
            status: 'INATIVO',
            salario: 1200,
        };

        const ret = await employeeScope.updateEmployee(params);

        expect(ret).toBeUndefined();
        done();
    });

    it('should validate deleteEmployee params', async (done) => {
        const params = {
            cpf: '1111111',
        };

        const ret = await employeeScope.deleteEmployee(params);

        expect(ret).toBeUndefined();
        done();
    });

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
