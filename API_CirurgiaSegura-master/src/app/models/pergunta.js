const selectPergunta = 'SELECT * FROM cirurgia.pergunta_cirurgia ORDER BY (id_pergunta) ASC';

const selectAlternativa = 'SELECT * FROM cirurgia.alternativa_cirurgia ORDER BY (id_pergunta) ASC';

const selectPerguntaById = 'SELECT * FROM cirurgia.pergunta_cirurgia WHERE id_pergunta = $1';

const selectAlternativaById = 'SELECT * FROM cirurgia.alternativa_cirurgia WHERE id_pergunta = $1';

module.exports = {
  selectPergunta,
  selectAlternativa,
  selectPerguntaById,
  selectAlternativaById,
};
