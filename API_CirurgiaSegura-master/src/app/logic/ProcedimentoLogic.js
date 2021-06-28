const { pool } = require('../../database/index')

const {
    insertProcedimento,
    selectProcedimentoById,
    selectProcedimentoByEstado,
    selectProcedimentoByData,
    selectProcedimentos,
    updateProcedimentoEstadoById,
} = require('../models/procedimento')

const insereProcedimento = async(estado,data,idProcedimento,idPaciente) => {
    await pool.query(insertProcedimento,[estado,data,idProcedimento,idPaciente])
}
const getProcedimentos = async() => {
    const requestProcedimentos = await pool.query(selectProcedimentos)
    return requestProcedimentos.rows
}

const getProcedimentosById = async(id) => {
    const requestProcedById = await pool.query(selectProcedimentoById, [id])
    return requestProcedById.rows
}

const getProcedimentosByEstado = async(estado) => {
    const requestProcedByEstado = await pool.query(selectProcedimentoByEstado, [estado])
    return requestProcedByEstado.rows
}

const updateProcedimentos = async(novo_estado,id) => {
    await pool.query(updateProcedimentoEstadoById,[novo_estado,id])
}

module.exports = {
    getProcedimentos,
    getProcedimentosById,
    getProcedimentosByEstado,

    updateProcedimentos,
    insereProcedimento
}