const insertGrupo = 'INSERT INTO cirurgia.grupo_profissional (tx_cod_grupo, id_profissional_saude, id_procedimento) \
VALUES ($1,$2,$3) ';
const insertGrupoProfissional = ' INSERT INTO cirurgia.grupo_profissional'
const selectGrupo = 'SELECT tx_cod_grupo FROM cirurgia.grupo_profissional'
const selectGrupoByCod = 'SELECT id_profissional_saude,id_procedimento FROM cirurgia.grupo_profissional WHERE tx_cod_grupo = $1';
const selectGrupoByProfissional= 'SELECT id_profissional_saude FROM cirurgia.grupo_profissional \
WHERE tx_cod_grupo = $1';
const selectGrupoByProcedimento = 'SELECT id_procedimento FROM cirurgia.grupo_profissional \
WHERE tx_cod_grupo = $1'
const selectGrupoByProcedCod = 'SELECT id_procedimento,tx_cod_grupo FROM cirurgia.grupo_profissional \
WHERE id_profissional_saude = $2 '
const deleteGrupo = 'DELETE FROM cirurgia.grupo_profissional WHERE tx_cod_grupo = $1'

module.exports = {
insertGrupo,
insertGrupoProfissional,

selectGrupo,
selectGrupoByProfissional,
selectGrupoByCod,
selectGrupoByProcedCod,
selectGrupoByProcedimento,

deleteGrupo
}

