import * as Yup from 'yup';
const connection = require('../database/database');
const infoUser = require('../database/model/transactionModel');
const criarConta = require('../database/model/criarContaModel');

connection.authenticate().then(() =>
{
    console.log("conexao de transação de conta feita com sucesso")
}).catch((msgErr) =>
{
    console.log(msgErr);
});

class transactionController
{
    async update(req,res)
    {
        const { recebedor, valor, pagador, senha } = req.body

            const pagadorUsuario = await infoUser.findOne({
                where: { contaID: pagador }
            });

            if(!pagadorUsuario)
            {
                return res.status(409).json({ error: "Pagador nao encontrado" })
            }

        if (pagadorUsuario.saldo < valor)
        {
            return res.status(400).json({ error: "saldo insulficiente" })
        }

        const recebedorUsuario = await infoUser.findOne({
            where: { contaID:recebedor }
        })

        if(!recebedorUsuario)
        {
            return res.status(409).json({ error: "Recebedor nao encontrado" })
        }

        const validate = await criarConta.findOne({
            where: { senha: senha },
            where: { cpf: pagador }
        });

        if(validate.senha != senha)
        {
            return res.status(409).json({ error: "Senha nao autenticada" })
        }

        pagadorUsuario.saldo -= parseFloat(valor);
        recebedorUsuario.saldo += parseFloat(valor);

        await pagadorUsuario.save()
        await recebedorUsuario.save()

        return res.status(200).json("Transferencia realizada com sucesso")
    }
}

export default new transactionController();