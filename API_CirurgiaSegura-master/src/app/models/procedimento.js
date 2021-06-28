const insertProcedimento = 'INSERT INTO cirurgia.procedimento (tx_estado, dt_data, id_procedimento, id_paciente) VALUES ($1,$2,$3,$4) RETURNING id_procedimento'

const selectProcedimentos = 'SELECT * FROM cirurgia.procedimento';

const selectProcedimentoById = 'SELECT * FROM cirurgia.procedimento WHERE id_procedimento = $1';

const selectProcedimentoByEstado = 'SELECT * FROM cirurgia.procedimento WHERE tx_estado = $1';

const selectProcedimentoByData = 'SELECT * FROM cirurgia.procedimento WHERE dt_date = $1';

const updateProcedimentoEstadoById = 'UPDATE cirurgia.procedimento SET tx_estado = $1 WHERE id_paciente = $2'

module.exports = {
    insertProcedimento,
    selectProcedimentoById,
    selectProcedimentoByEstado,
    selectProcedimentoByData,
    selectProcedimentos,
    updateProcedimentoEstadoById,
}