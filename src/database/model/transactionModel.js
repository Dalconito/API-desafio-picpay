const sequelize = require('sequelize');
const database = require('../database');

const infoUser = database.define('infouser', {
    nome:{
        type: sequelize.STRING,
        allowNull:false
    },
    contaID:{
        type: sequelize.STRING,
        allowNull:false
    },
    saldo:{
        type: sequelize.FLOAT,
        allowNull:false
    },
});

infoUser.sync({force:false}).then(() => {
    console.log("Tabela de informação de usuarios criada");
})

module.exports = infoUser;