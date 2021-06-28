const { pool } = require('../../database/index');

// ------------------------- IMPORTS ------------------------------

const {
  selectPergunta,
  selectAlternativa,
  selectPerguntaById,
  selectAlternativaById,
} = require('../models/pergunta');


// ------------------------- GET ------------------------------

const getPerguntaBD = async (id) => {
  const resultPergunta = await pool.query(selectPerguntaById, [id]);
  const resultAlternativa = await pool.query(selectAlternativaById, [id]);

  const resposta = {
    pergunta: resultPergunta.rows[0],
    alternativas: { alternativa: resultAlternativa.rows },
  };

  return resposta;
};

const getPerguntasBD = async () => {
  const resultPerguntas = await pool.query(selectPergunta);
  const resultAlternativas = await pool.query(selectAlternativa);

  const resposta = {
    perguntas: resultPerguntas.rows.map(elem1 => ({
      pergunta: elem1,
      alternativas: {
        alternativa: resultAlternativas
          .rows
          .filter(elem2 => elem1.id_pergunta === elem2.id_pergunta),
      },
    })),
  };

  return resposta;
};

// ------------------------- EXPORTS ------------------------------

module.exports = {
  getPerguntaBD,
  getPerguntasBD,
};
