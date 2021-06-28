const { pool } = require('../../database/index')

const {
insertGrupo,
selectGrupo,
deleteGrupo
} = require('../models/grupo_profissional')

const insereGrupo = async(cod_grupo,idProfissional, idProcedimento) => {
    await pool.query(insertGrupo, [cod_grupo,idProfissional,idProcedimento])
}

const selecionaGrupo = async() => {
    const resultGrupos = await pool.query(selectGrupo);
    return resultGrupos.rows;
}

const deletaGrupo = async(cod_grupo) => {
    await pool.query(deleteGrupo, [cod_grupo])
}

module.exports = {
    insereGrupo,
    selecionaGrupo,
    deletaGrupo
}