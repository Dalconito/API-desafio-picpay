const sequelize = require('sequelize');
const database = require('../database');

const criarConta = database.define('criarConta',{
    nome:{
        type: sequelize.STRING,
        allowNull:false
    },
    sobrenome:{
        type: sequelize.STRING,
        allowNull:false
    },
    cpf:{
        type: sequelize.STRING,
        allowNull:true
    },
    email:{
        type: sequelize.STRING,
        allowNull:false
    },
    senha:{
        type: sequelize.STRING,
        allowNull:false
    },
    cnpj:{
        type: sequelize.STRING,
        allowNull:true
    },
})

criarConta.sync({ force:false }).then(() => {
    console.log("Tabela de criação de contas criada");
})

module.exports = criarConta;