const employeeHelper = require('../../scripts/employeeHelper');

describe('Employee scripts tests', () => {
    it('should format a date and return a valid new Date object', () => {
        const date = employeeHelper.formatDate('15/04/2017');
        const expectedDate = new Date('2017-04-15');

        expect(date).toStrictEqual(expectedDate);
    });

    it('should format a line with employee information and return a formatted object', () => {
        const line =
            '15/04/2017;Dev Jr;85235708709;Aaron Aaberg;AP;8965.30;ATIVO';

        const employeeData = employeeHelper.generateEmployeeObject(line);
        const expectedObject = {
            dataCad: new Date('2017-04-15'),
            cargo: 'Dev Jr',
            cpf: '85235708709',
            nome: 'Aaron Aaberg',
            ufNasc: 'AP',
            salario: 8965.3,
            status: 'ATIVO'
        };

        expect(employeeData).toEqual(expectedObject);
    });

    it('should generate a employee list and return an array', async () => {
        const data = await employeeHelper.getEmployeeList();

        expect(Array.isArray(data)).toBeTruthy();
    });

    it('should generate a employee list ignoring the file header', async () => {
        const wrongFirstItem = {
            dataCad: 'Invalid Date',
            cargo: 'Cargo',
            cpf: 'Cpf',
            nome: 'Nome',
            ufNasc: 'UfNasc',
            salario: NaN,
            status: 'Status'
        };

        const data = await employeeHelper.getEmployeeList();

        expect(data).toHaveProperty('length');
        expect(data[0]).not.toEqual(wrongFirstItem);
    });
});
