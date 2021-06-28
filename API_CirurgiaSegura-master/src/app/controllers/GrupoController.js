const express = require('express')

const {
    insereGrupo,
    selecionaGrupo,
    deletaGrupo
} = require('../logic/GrupoLogic')

const router = express.Router()

router.get('/', async(res,req)=>{
    try{
        const resultGrupos = await selecionaGrupo();
        return res.status(200).send({grupos: resultGrupos });
    } catch (err){
        return res.status(400).send({error: ' Erro ao listar os grupos'});
    }
})

module.exports = app => app.use('/grupos',router);