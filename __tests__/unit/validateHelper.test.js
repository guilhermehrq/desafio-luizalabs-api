const validate = require('../../src/helper/validate');

describe('validateHelper unit test', () => {
    const validation = {
        testRequired: {
            required: true,
        },
        testNotNull: {
            notNull: true,
        },
        testNumber: {
            number: true,
        },
        testNumberInteger: {
            number: 'integer',
        },
        testNumberSmallint: {
            number: 'smallint',
        },
        testString: {
            string: true,
        },
        testDate: {
            date: true,
        },
        testBoolean: {
            boolean: true,
        },
        testRange: {
            range: [0, 10],
        },
        testMaxLength: {
            maxLength: 10,
        },
        testObject: {
            validation: {
                testRequired: {
                    required: true,
                },
                testNotNull: {
                    notNull: true,
                },
                testNumber: {
                    number: true,
                },
                testString: {
                    string: true,
                },
                testDate: {
                    date: true,
                },
                testBoolean: {
                    boolean: true,
                },
                testRange: {
                    range: [0, 10],
                },
                testMaxLength: {
                    maxLength: 10,
                },
            },
        },
        testAllArrayItems: {
            validation: {
                testRequired: {
                    required: true,
                },
            },
        },
        testArray: {
            array: {
                required: true,
            },
        },
    };

    const goodParams = {
        testRequired: 'something',
        testNotNull: 'something',
        testNumber: 1,
        testNumberInteger: 1,
        testNumberSmallint: 1,
        testString: 'something',
        testDate: '2019-06-25',
        testBoolean: true,
        testRange: 5,
        testMaxLength: 'some',
        testObject: {
            testRequired: 'something',
            testNotNull: 'something',
            testNumber: 1,
            testString: 'something',
            testDate: '2019-06-25',
            testBoolean: true,
            testRange: 5,
            testMaxLength: 'some',
        },
        testAllArrayItems: [{ testRequired: true }],
        testArray: [true],
    };

    const badParams = {
        testRequired: undefined,
        testNotNull: null,
        testNumber: 'something',
        testNumberInteger: 99999999999,
        testNumberSmallint: 2147483647,
        testString: 1,
        testDate: '25/06/2019',
        testBoolean: 'true',
        testRange: 100,
        testMaxLength: 'some text really large',
        testObject: {
            testRequired: undefined,
            testNotNull: null,
            testNumber: 'something',
            testString: 1,
            testDate: '25/06/2019',
            testBoolean: 'true',
            testRange: 100,
            testMaxLength: 'some text really large',
        },
        testAllArrayItems: [{ testRequired: undefined }],
        testArray: [undefined],
    };

    it("should execute the validation and don't return errors", async (done) => {
        const result = await validate(goodParams, validation);

        expect(result).toBeTruthy();

        done();
    });

    it('should execute the validation and return errors', async (done) => {
        const expectedErrors = [
            '"testRequired" é obrigatório',
            '"testNotNull" não pode ser nulo',
            '"testNumber" deve ser um número',
            '"testString" deve ser um texto',
            '"testDate" deve ser uma data',
            '"testBoolean" deve ser boolean',
            '"testRange" deve ser menor que 10',
            '"testMaxLength" deve ser conter menos que 10 caracteres',
            '"testRequired" é obrigatório em "testObject"',
            '"testNotNull" não pode ser nulo em "testObject"',
            '"testNumber" deve ser um número em "testObject"',
            '"testString" deve ser um texto em "testObject"',
            '"testDate" deve ser uma data em "testObject"',
            '"testBoolean" deve ser boolean em "testObject"',
            '"testRange" deve ser menor que 10 em "testObject"',
            '"testMaxLength" deve ser conter menos que 10 caracteres em "testObject"',
            '"testRequired" é obrigatório no 1° item de "testAllArrayItems"',
            '"testArray" é obrigatório no 1° item',
        ];

        try {
            await validate(badParams, validation);
        } catch (e) {
            expect(e).toEqual(expectedErrors);

            done();
        }
    });
});
