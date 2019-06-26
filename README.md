# Desafio Técnico Luizalabs

![Build status](https://travis-ci.com/guilhermehrq/desafio-luizalabs.svg?token=NMRqR1XzXHw8yVERNabp&branch=master)

Aplicação desenvolvida com base no documento técnico para vaga de desenvolvedor do [Luizalabs](https://www.99jobs.com/luizalabs).

-   Desenvolvido com [NodeJS](https://nodejs.org/)
-   Testes automatizados utilizando [Jest](https://jestjs.io/)
-   Integração continua com [TravisCI](https://travis-ci.com/)
-   Padronização do projeto seguindo especificações da [Airbnb](https://github.com/airbnb/javascript) em conjunto com [ESLint](https://eslint.org/)

## O desafio

Deveria ser criado um Web Services em padrão REST que disponibiliza-se serviços com base em um arquivo _.txt_ que continha informações de vários funcionários.
O Web Services deveria disponibilizar serviços como:

-   Busca de funcionários com filtros como: Nome, CPF, Cargo, Data de cadastro, Faixa Salarial, e Status
-   Retornar UFs de nascimento dos funcionários de forma quantitativa
-   Possibilidade de inclusão de um novo funcionário
-   Possibilidade de alteração de um funcionário existente
-   Possibilidade de exclusão de um determinado funcionário pelo seu número de CPF

## Executando a aplicação

Para execução do projeto certifique-se de ter instalado em sua máquina o [NodeJS](https://nodejs.org/en/download/) juntamente com o [Git](https://git-scm.com/downloads).

Execute os seguintes comandos no terminal de sua máquina:

```sh
$ git clone https://github.com/guilhermehrq/desafio-luizalabs.git
$ cd desafio-luizalabs
$ npm install
```

Esta aplicação utiliza o banco de dados NoSQL [MongoDB](https://www.mongodb.com/), por conta disso certifique-se de ter instalado o mesmo em sua máquina ou utilize uma plataforma online, recomendo o uso do [mLab](https://mlab.com/) _(It's free :D)_.

**Configurando váriaveis de ambiente**

Abra os arquivos _.env_ e _.env.test_ que devem armazenar as váriaveis de ambiente de desenvolvimento e testes respectivamente. Para ambos os arquivos deveram ser configuradas as seguintes váriaveis:

```js
DB_USER= // usuário do banco no mongo
DB_PASS= // senha do banco
DB_NAME= // nome do banco no mongo
DB_HOST= // servidor:porta onde está rodando o serviço do mongo (Local: localhost:27017)
PORT= // (OPCIONAL) porta onde a API sera disponibilizada (DEFAULT: 3000)
```

Após a configuração de ambos os arquivos basta abrir o terminal e executar o seguinte comando para popular a base de desenvolvimento:

```sh
$ npm run populate-database
```

> Este comando pode ser executado sempre que necessário re-popular a collection

> A base de testes é recriada sempre que os testes automatizados são
> executados.

Para demonstrações poderam ser utilizadas as seguintes configurações (ambas já possuem suas collections populadas, sem a necessidade de executar o comando acima):

**_.env_**

```js
DB_USER=admin
DB_PASS=test123
DB_NAME=desafio-labs
DB_HOST=ds243607.mlab.com:43607
```

**_.env.test_**

```js
DB_USER=admin
DB_PASS=test123
DB_NAME=desafio-labs-tests
DB_HOST=ds243317.mlab.com:43317
```

**Iniciando a API**

Para iniciar os serviços da API basta executar o comando:

```sh
$ npm start
```

e acessar os endpoints a partir da rota base: http://localhost:3000

## Endpoints

| MÉTODO | ROTA                   | DESCRIÇÃO                                                                                                         |
| ------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| GET    | /ping                  | Verifica se a API está rodando                                                                                    |
| GET    | /employee              | Retorna os funcionários, podem ser passados filtros (nome, cpf, cargo, data de cadastro, faixa salarial e status) |
| POST   | /employee              | Insere um novo funcionário no banco                                                                               |
| GET    | /employee/:employeeId | Busca um funcionário pelo seu número de CPF                                                                       |
| PUT    | /employee/:employeeId | Atualiza um funcionário pelo número de seu CPF                                                                    |
| DELETE | /employee/:employeeId | Exclui um funcionário pelo seu número de CPF                                                                      |
| GET    | /employee-states       | Retorna lista de UFs de nascimento dos funcionários, com suas quantidades                                         |

## Testes automatizados

Para execução dos testes automatizados com Jest, certifique de ter configurado corretamente o arquivo _.env.tests_ e então execute o comando:

```sh
$ npm test
```
