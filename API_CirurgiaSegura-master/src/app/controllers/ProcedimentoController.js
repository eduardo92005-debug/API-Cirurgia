const express = require('express')

const {
    getProcedimentos,
    updateProcedimentos,
    insereProcedimento
} = require('../logic/ProcedimentoLogic')

const router = express.Router()

router.get('/', async(req,res) => {
    try{
       const format =  await getProcedimentos();
       return res.status(200).send(format);
    }catch(err){
        return res.status(400).send({
            error: 'Erro de acesso a rota',
            msgError: err,
        });
    }
})

router.post('/register', async(req,res)=> {
    try{
        const {
            estado,
            data,
            idProcedimento,
            idPaciente
        } = req.body
        await insereProcedimento(estado,data,idProcedimento,idPaciente)
        return res.status(200).send({
            ok:'Procedimento cadastrado com sucesso!'
        });
    }catch(err){
        return res.status(400).send({
            error: 'Falha! Procedimento não cadastrado',
            msgErro: err,
        });
    }
})

router.put('/:id', async(req,res) => {
    try{
        const id = parseInt(req.params.id,10);
        const { novo_estado } = req.body

        await updateProcedimentos(novo_estado,id);
        return res.status(200).send({ok:`Atualizado o procedimento de id: ${id}`})
    } catch(err) {
        return res.status(400).send({
            error: 'Atualização do procedimento falhou',
            msgErro: err,
        });
    }
})
module.exports = app => app.use('/procedimentos',router);