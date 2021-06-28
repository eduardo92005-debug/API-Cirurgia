const express = require('express')
const authMiddleware = require('../middlewares/auth')

const {
    insertRespostaObjetiva,
    insertRespostaSubjetiva
} = require ('../logic/InstrumentoLogic')

const router = express.Router();
router.post('/register', async (req,res)=> {
    try {
        const { respostas } = req.body
        respostas.foreach(async(element, index, array ) => {
            const { resposta } = element
            const { codPergunta, textoResposta, tipo, id} = resposta

            if( tipo === 'OBJ')
                await insertRespostaObjetiva(textoResposta,id, codPergunta)
            else if(tipo === 'SUB')
                await insertRespostaSubjetiva(textoResposta,id, codPergunta)
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({error:'Registro'})
    }
});

module.exports = app => app.use('/instrumento', router)