require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const mongoose = require('mongoose');
const Employee = require('../../src/models/employeeModel');
const employeeRepository = require('../../src/core/employee/repository');
const employeeService = require('../../scripts/employeeService');

beforeAll(async (done) => {
    jest.setTimeout(30000);

    await mongoose.connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${
            process.env.DB_NAME
        }`,
        {
            useNewUrlParser: true,
        },
    );

    Employee.deleteMany({}, async (err, res) => {
        if (err) {
            throw err;
        }

        await employeeService();

        done();
    });
});

describe('EmployeeRepository tests', () => {
    it('should list max 10 employees and have totalRows property', async (done) => {
        const employees = await employeeRepository.getEmployee({}, 1);

        expect(employees.list).toHaveProperty('length');
        expect(employees.list.length).toBeLessThanOrEqual(10);
        expect(employees).toHaveProperty('totalRows');

        done();
    });

    it('should get employees from two different pages', async (done) => {
        const pageOne = await employeeRepository.getEmployee({}, 1);
        const pageTwo = await employeeRepository.getEmployee({}, 2);

        expect(pageOne.list).not.toEqual(pageTwo.list);
        done();
    });

    it('should be an array and have a _id and count property in each item', async (done) => {
        const employeeStates = await employeeRepository.getEmployeeStates();

        expect(Array.isArray(employeeStates)).toBeTruthy();
        if (employeeStates.length) {
            expect(employeeStates[0]).toHaveProperty('_id');
            expect(employeeStates[0]).toHaveProperty('count');
        }
        done();
    });

    it('should insert a new employee at the database', async (done) => {
        const employeeData = {
            nome: 'Teste',
            cpf: '12345678909',
            ufNasc: 'SP',
            cargo: 'Dev Jr',
            status: 'ATIVO',
            salario: 1500,
        };

        const id = await employeeRepository.insertEmployee(employeeData);

        expect(id).toBeTruthy();

        done();
    });

    it('should try to insert a new employe with a already registered cpf', async (done) => {
        try {
            const employeeData = {
                nome: 'Teste',
                cpf: '12345678909',
                ufNasc: 'SP',
                cargo: 'Dev Jr',
                status: 'ATIVO',
                salario: 1500,
            };

            await employeeRepository.insertEmployee(employeeData);
        } catch (e) {
            expect(e).toHaveProperty('statusCode', 401);
            expect(e).toHaveProperty('message', 'CPF já cadastrado');
        }

        done();
    });

    it('should get a employee by cpf filter', async (done) => {
        const employee = await employeeRepository.getEmployeeByCpf('12345678909');

        expect(employee).toHaveProperty('_id');
        expect(employee).toHaveProperty('nome', 'Teste');
        done();
    });

    it('should try to get a employee by cpf filter and receive a 404 error (not found)', async (done) => {
        try {
            await employeeRepository.getEmployeeByCpf('777777777');
        } catch (e) {
            expect(e).toHaveProperty('statusCode', 404);
            expect(e).toHaveProperty('message', 'Funcionário não encontrado');
        }

        done();
    });

    it('should update an employee', async (done) => {
        const employeeData = {
            employeeCpf: '12345678909',
            nome: 'Funcionario Teste',
            ufNasc: 'RJ',
            cargo: 'Dev Jr',
            status: 'INATIVO',
            salario: 1200,
        };

        const updatedEmployee = await employeeRepository.updateEmployee(employeeData);

        expect(updatedEmployee).toHaveProperty('nome', 'Funcionario Teste');
        expect(updatedEmployee).toHaveProperty('ufNasc', 'RJ');
        expect(updatedEmployee).toHaveProperty('status', 'INATIVO');
        expect(updatedEmployee).toHaveProperty('salario', 1200);

        done();
    });

    it('should try to update an employee and receive a 404 error (not found)', async (done) => {
        try {
            const employeeData = {
                employeeCpf: '777777777',
                nome: 'Funcionario Teste',
                ufNasc: 'RJ',
                cargo: 'Dev Jr',
                status: 'INATIVO',
                salario: 1200,
            };

            await employeeRepository.updateEmployee(employeeData);
        } catch (e) {
            expect(e).toHaveProperty('statusCode', 404);
            expect(e).toHaveProperty('message', 'Funcionário não encontrado');
        }

        done();
    });
});

afterAll(async (done) => {
    await mongoose.disconnect();
    done();
});
