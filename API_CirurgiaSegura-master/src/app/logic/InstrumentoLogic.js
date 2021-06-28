const { pool } = require('../../database/index')

const {
    insertRespObjetiva,
    insertRespSubjetiva,
} = require('../models/instrumento')

const insertRespostaObjetiva = async(textoResposta, idProcedimento, codPergunta) => {
    await pool.query(insertRespObjetiva, [textoResposta, idProcedimento, codPergunta])
}

const insertRespostaSubjetiva = async(textoResposta, idProcedimento, codPergunta) => {
    await pool.query(insertRespSubjetiva, [textoResposta, idProcedimento, codPergunta])
}

module.exports = {
    insertRespostaObjetiva,
    insertRespostaSubjetiva
}