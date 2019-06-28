
# Desafio Técnico Luizalabs - API

![Build status](https://travis-ci.com/guilhermehrq/desafio-luizalabs.svg?token=NMRqR1XzXHw8yVERNabp&branch=master)

Aplicação desenvolvida com base no documento técnico para vaga de desenvolvedor no [Luizalabs](https://www.99jobs.com/luizalabs).

-   Desenvolvido com [NodeJS](https://nodejs.org/)
-   Aplicação [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer)
-   Testes automatizados utilizando [Jest](https://jestjs.io/)
-   Integração continua com [TravisCI](https://travis-ci.com/)
-   Deploy automático no [Heroku](https://www.heroku.com/)
-   Padronização de projeto seguindo especificações da [Airbnb](https://github.com/airbnb/javascript) configuradas com o uso do [ESLint](https://eslint.org/)
-   Documentação da API feita com [Swagger](https://swagger.io)

## Índice

-   [O desafio](#id1)
-   [Demo](#id2)
-   [Executando a aplicação](#id3)
    -   [Configurando variáveis de ambiente](#id4)
    -   [Populando o banco de dados](#id5)
    -   [Iniciando a API](#id6)
-   [Endpoints](#id7)
-   [Documentação](#id8)
-   [Testes automatizados](#id9)

<div id='id1' />

## O desafio

Deveria ser criado um Web Services em padrão REST que disponibiliza-se serviços com base em um arquivo _.txt_ que continha informações de vários funcionários.

O Web Services deveria disponibilizar serviços como:

-   Busca de funcionários com filtros como: Nome, CPF, Cargo, Data de cadastro, Faixa Salarial, e Status
-   Retornar UFs de nascimento dos funcionários de forma quantitativa
-   Possibilidade de inclusão de um novo funcionário
-   Possibilidade de alteração de um funcionário existente
-   Possibilidade de exclusão de um determinado funcionário pelo seu número de CPF

Para consumo dos serviços citados acima, foi desenvolvida uma aplicação frontend com ReactJS, para mais informações basta acessar o repositório [Desafio Técnico Luizalabs - Web](https://github.com/guilhermehrq/desafio-luizalabs-web)

<div id='id2' />

## Demo

Uma versão em funcionamento da aplicação está disponível para demonstrações e pode ser acessada através do endereço:

[Desafio Luizalabs (Web)](https://desafio-luizalabs.herokuapp.com/)

Esta API também pode ser consumida em uma instância do Heroku através da rota base:

https://desafio-luizalabs-api.herokuapp.com

> Confira os [endpoints](#id6) disponíveis.

Para mais detalhes é possível ter acesso a documentação da API através do Swagger acessando o endereço:

[Desafio Luizalabs (Documentação)](https://desafio-luizalabs-api.herokuapp.com/api-docs)

> O Heroku trabalha em regime de demanda em suas instâncias, por isso, o **primeiro** acesso ou requisição a algum dos endereços a cima pode demorar alguns segundos.

<div id='id3' />

## Executando a aplicação

Para executar a aplicação certifique-se de ter instalado em sua máquina o [NodeJS](https://nodejs.org/en/download/) juntamente com o [Git](https://git-scm.com/downloads).

Execute os seguintes comandos no terminal de sua máquina:

```sh
$ git clone https://github.com/guilhermehrq/desafio-luizalabs.git
$ cd desafio-luizalabs
$ npm install
```

Esta aplicação utiliza o banco de dados NoSQL [MongoDB](https://www.mongodb.com/), por conta disso certifique-se de ter instalado o mesmo em sua máquina ou utilize uma plataforma online, recomendo o uso do [mLab](https://mlab.com/) _(It's free :D)_.

<div id='id4' />

**Configurando variáveis de ambiente**

Abra os arquivos _.env_ e _.env.test_, que devem armazenar as váriaveis de ambiente de desenvolvimento e testes respectivamente. Para ambos os arquivos devem ser configuradas as seguintes váriaveis:

```js
DB_USER= // usuário do banco no mongo
DB_PASS= // senha do usuário
DB_NAME= // nome do banco no mongo
DB_HOST= // servidor onde está rodando o serviço do mongo (LOCAL: localhost:27017)
PORT= // (OPCIONAL) porta onde a API será disponibilizada (PADRÃO: 3001)
```

Para demonstrações poderão ser utilizadas as seguintes configurações (ambas já possuem suas collections populadas, tornando assim, o passo _"Populando o banco de dados"_ opcional):

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

<div id='id5' />

**Populando o banco de dados**

Após a configuração de ambos os arquivos basta abrir o terminal e executar o seguinte comando para popular a base de desenvolvimento:

```sh
$ npm run populate-database
```

> Este comando pode ser executado sempre que necessário recriar o banco de dados.

> A base de testes é re-criada sempre que os testes automatizados são
> executados.

<div id='id6' />

**Iniciando a API**

Para iniciar os serviços da API basta executar o comando:

```sh
$ npm start
```

e acessar os endpoints a partir da rota base: http://localhost:3001

<div id='id7' />

## Endpoints

| MÉTODO | ROTA                  | DESCRIÇÃO                                                                                                                   |
| ------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| GET    | /ping                 | Verifica se a API está ativa                                                                                                |
| GET    | /employee             | Retorna uma lista de funcionários, podem ser passados filtros (nome, cpf, cargo, data de cadastro, faixa salarial e status) |
| POST   | /employee             | Insere um novo funcionário no banco                                                                                         |
| GET    | /employee/:employeeId | Busca um funcionário pelo seu número de CPF                                                                                 |
| PUT    | /employee/:employeeId | Atualiza um funcionário pelo número de seu CPF                                                                              |
| DELETE | /employee/:employeeId | Exclui um funcionário pelo seu número de CPF                                                                                |
| GET    | /employee-states      | Retorna lista de UFs de nascimento dos funcionários, com suas quantidades                                                   |
| GET    | /api-docs             | Rota para a documentação da API feita com Swagger. **(ACESSAR ESTE ATRAVÉS DE SEU NAVEGADOR)**                              |

<div id='id8' />

## Documentação

Para encontrar detalhes mais técnicos sobre os serviços, endpoints e parametros que podem ou devem ser passados e dados que serão recebidos da API, basta iniciar o projeto e acessar a rota:

http://localhost:3001/api-docs/

Nesta será fornecida uma interface contendo a documentação completa, feita com Swagger, com expecificações de cada um dos endpoints existentes na API.

<div id='id9' />

## Testes automatizados

Para execução dos testes automatizados com Jest, certifique-se de ter configurado corretamente o arquivo _.env.tests_ e então execute o comando:

```sh
$ npm test
```
