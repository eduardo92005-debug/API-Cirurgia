const insertRespObjetiva = 'INSERT INTO cirurgia.resposta_objetiva (tx_resposta, id_procedimento, id_pergunta) VALUES ($1,$2,$3)'

const insertRespSubjetiva = 'INSERT INTO cirurgia.resposta_subjetiva (tx_resposta, id_procedimento, id_pergunta) VALUES ($1,$2,$3)'

/*const updateRespObjetiva = 'UPDATE cirurgia.resposta_objetiva SET tx_resposta = $1 WHERE id_procedimento = $2 AND id_pergunta = $3'

const updateRespSubjetiva = 'UPDATE cirurgia.resposta_subjetiva SET tx_resposta = $1 WHERE id_procedimento = $2 AND id_pergunta = $3'
*/
module.exports = {
    insertRespObjetiva,
    insertRespSubjetiva,
    //updateRespObjetiva,
    //updateRespSubjetiva
}