module.exports = validate;

/**
 * Recebe uma lista de parametro e uma lista de validações pelas quais deve passar
 * Validações como: dados obrigatórios, se é string, number, boolean, date e etc.
 * @param {Object} params - Lista de parametros a serem validados
 * @param {Object} validation - Lista de validações separadas por cada parametro passado
 * @returns {Array}
 */
function doValidate(params, validation) {
    const errorList = [];
    const paramsNames = Object.keys(validation);

    paramsNames.forEach((paramName) => {
        const metalDetector = validation[paramName];
        const suitcase = params[paramName];

        if (metalDetector.required) {
            if (typeof suitcase === 'undefined') return errorList.push(`"${paramName}" é obrigatório`);
        }

        if (metalDetector.notNull) {
            if (suitcase === null) return errorList.push(`"${paramName}" não pode ser nulo`);
        }

        if (suitcase && metalDetector.number) {
            if (isNaN(suitcase)) return errorList.push(`"${paramName}" deve ser um número`);

            if (
                metalDetector.number === 'integer'
                && suitcase > 2147483647
                && suitcase < -2147483648
            ) return errorList.push(`"${paramName}" deve ser um número (integer)`);
            if (metalDetector.number === 'smallint' && suitcase > 32768 && suitcase < -32768) return errorList.push(`"${paramName}" deve ser um número (smallint)`);
        }

        if (suitcase && metalDetector.string) {
            if (!(typeof suitcase === 'string' || suitcase instanceof String)) return errorList.push(`"${paramName}" deve ser um texto`);
        }

        if (suitcase && metalDetector.date) {
            if (!(new Date(suitcase) !== 'Invalid Date' && !isNaN(new Date(suitcase)))) return errorList.push(`"${paramName}" deve ser uma data`);
        }

        if (suitcase && metalDetector.boolean) {
            if (typeof suitcase !== 'boolean') {
                return errorList.push(`"${paramName}" deve ser boolean`);
            }
        }

        if (suitcase && metalDetector.range) {
            if (suitcase < metalDetector.range[0]) {
                return errorList.push(
                    `"${paramName}" deve ser maior que ${metalDetector.range[0]}`,
                );
            }
            if (suitcase > metalDetector.range[1]) {
                return errorList.push(
                    `"${paramName}" deve ser menor que ${metalDetector.range[1]}`,
                );
            }
        }

        if (suitcase && metalDetector.maxLength) {
            if (suitcase.length > metalDetector.maxLength) {
                return errorList.push(
                    `"${paramName}" deve ser conter menos que ${
                        metalDetector.maxLength
                    } caracteres`,
                );
            }
        }

        // Valida propriedades de objetos e de objetos dentro de arrays
        if (suitcase && metalDetector.validation) {
            let suitcaseParsed;
            if (typeof suitcase === 'string') {
                suitcaseParsed = JSON.parse(suitcase);
            } else {
                suitcaseParsed = suitcase;
            }
            const isObject = suitcaseParsed !== null && typeof suitcaseParsed === 'object';
            const isArray = suitcaseParsed && suitcaseParsed.constructor === Array;

            if (isArray) {
                suitcaseParsed.forEach((suitcaseParsedItem, i) => {
                    const children = doValidate(suitcaseParsedItem, metalDetector.validation);
                    children.forEach((error) => {
                        errorList.push(`${error} no ${i + 1}° item de "${paramName}"`);
                    });
                });
            } else if (isObject) {
                const children = doValidate(suitcaseParsed, metalDetector.validation);
                children.forEach((error) => {
                    errorList.push(`${error} em "${paramName}"`);
                });
            }
        }

        // Valida todos os itens de um array, seguindo as validações passadas
        if (suitcase && metalDetector.array) {
            let suitcaseParsed;
            if (typeof suitcase === 'string') {
                suitcaseParsed = JSON.parse(suitcase);
            } else {
                suitcaseParsed = suitcase;
            }
            suitcaseParsed.forEach((suitcaseItem, i) => {
                const array = {};
                const arrayValidate = {};
                arrayValidate[paramName] = metalDetector.array;
                array[paramName] = suitcaseItem;
                const children = doValidate(array, arrayValidate);
                children.forEach((error) => {
                    errorList.push(`${error} no ${i + 1}° item`);
                });
            });
        }
    });

    return errorList;
}

/**
 * Executa as validações e caso tenha errors, dispara o erro para aplicação
 * Caso não tenha errors, retorna true
 * @param {Object} params - Lista de parametros a serem validados
 * @param {Object} validation - Lista de validações separadas por cada parametro passado
 * @returns {Boolean}
 */
async function validate(params, validation) {
    const errorList = doValidate(params, validation);

    if (errorList.length) {
        throw errorList;
    }

    return true;
}
