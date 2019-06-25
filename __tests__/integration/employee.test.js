const mongoose = require('mongoose');
const request = require('supertest');

const Employee = require('../../src/models/employeeModel');
const employeeService = require('../../scripts/employeeService');
const app = require('../../src/app');

beforeAll(async (done) => {
    jest.setTimeout(30000);

    Employee.deleteMany({}, async (err, res) => {
        if (err) {
            throw err;
        }

        await employeeService();

        done();
    });
});

describe('getEmployees integration test', () => {
    it('should to do a GET request to /employee and receive a status 200 (OK)', async (done) => {
        const response = await request(app)
            .get('/employee')
            .query({
                page: 1,
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toHaveProperty('list');
        expect(response.body.content).toHaveProperty('totalRows');

        done();
    });

    it('should to do a GET request and receive a status 400 (Bad Request)', async (done) => {
        const response = await request(app)
            .get('/employee')
            .query({
                page: 1,
                nome: 'Test',
                cpf: '111111111',
                cargo: 'Dev',
                dataCad: '15/04/2019',
                status: 'ATIVO',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');

        done();
    });
});

describe('getEmployeeStates integration test', () => {
    it('should do a GET request to /employee-states and receive a status 200 (OK)', async (done) => {
        const response = await request(app).get('/employee-states');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('content');

        done();
    });
});

describe('getEmployeeByCpf integration test', () => {
    it('should do a GET request to /employee/:employeeCpf and receive a status 200 (OK)', async (done) => {
        const response = await request(app).get('/employee/85235708709');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toHaveProperty('_id');

        done();
    });

    it('should do a GET request to /employee/:employeeCpf and receive a status 404 (Not Found)', async (done) => {
        const response = await request(app).get('/employee/22222222');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');

        done();
    });
});

describe('insertEmployee integration test', () => {
    const defaultUser = {
        nome: 'Teste',
        cpf: '111111111',
        ufNasc: 'SP',
        cargo: 'Dev Pl',
        status: 'ATIVO',
        salario: 8500,
    };

    it('should do a POST request to /employee and receive a status 200 (OK)', async (done) => {
        const response = await request(app)
            .post('/employee')
            .send(defaultUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('message');

        done();
    });

    it('should do a POST request to /employee and receive a status 401 (Not Authorized)', async (done) => {
        const response = await request(app)
            .post('/employee')
            .send(defaultUser);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');

        done();
    });

    it('should do a POST request to /employee and receive a status 400 (Bad Request)', async (done) => {
        const response = await request(app)
            .post('/employee')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');

        done();
    });
});

describe('updateEmployee integration test', () => {
    const defaultUser = {
        _id: '5d12ac9393923f48ba76efc6',
        nome: 'Teste',
        ufNasc: 'SP',
        cargo: 'Dev Pl',
        status: 'ATIVO',
        salario: 8500,
    };

    it('should do a PUT request to /employee/:employeeCpf and receive a status 200 (OK)', async (done) => {
        const response = await request(app)
            .put('/employee/111111111')
            .send(defaultUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Funcionário atualizado com sucesso');

        done();
    });

    it('should do a PUT request to /employee and receive a status 404 (Not Found)', async (done) => {
        const response = await request(app)
            .put('/employee/2222222')
            .send(defaultUser);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');

        done();
    });

    it('should do a PUT request to /employee and receive a status 400 (Bad Request)', async (done) => {
        const response = await request(app)
            .put('/employee/111111111')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');

        done();
    });
});

describe('deleteEmployee integration test', () => {
    it('should do a DELETE request to /employee/:employeeCpf and receive a status 200 (OK)', async (done) => {
        const response = await request(app).delete('/employee/111111111');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('content');

        done();
    });

    it('should do a DELETE request to /employee/:employeeCpf and receive a status 404 (Not Found)', async (done) => {
        const response = await request(app).delete('/employee/111111111');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');

        done();
    });
});

afterAll(async (done) => {
    await mongoose.disconnect();
    done();
});
