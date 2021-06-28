const { pool } = require('../../database/index');

// ------------------------- IMPORTS ------------------------------
const {
  selectProfissionalJoinPessoa,
  selectProfissionalJoinPessoaById,
  updatePessoaById,
  updateProfissionalById,
  deletePessoaById,

  selectPessoaByCpfId,
  selectProfissionalByLoginId,
  selectProfissionalByEmailId,
} = require('../models/profissional');

// ------------------------- GET ------------------------------

const getProfissionaisBD = async () => {
  const resultProfissionais = await pool.query(selectProfissionalJoinPessoa);
  return resultProfissionais.rows;
};

const getProfissionalById = async (id) => {
  const resultProfissional = await pool.query(selectProfissionalJoinPessoaById, [id]);
  return resultProfissional.rows[0];
};

// ------------------------- UPDATE ------------------------------

const updatePessoaBD = async (cpf, name, email, id) => {
  await pool.query(updatePessoaById, [cpf, name, email, id]);
};

const updateProfissionalBD = async (profissao, login, id) => {
  await pool.query(updateProfissionalById, [profissao, login, id]);
};

// ------------------------- DELETE ------------------------------

const deletePessoaBD = async (id) => {
  await pool.query(deletePessoaById, [id]);
};

// ------------------------- CHEKIN BD ------------------------------

/* funcao auxiliar para checar se o cpf ja foi cadastrado no banco de dados */
const checkCpfBD = async (cpf, id) => {
  const resultPessoaCpf = await pool.query(selectPessoaByCpfId, [cpf, id]);
  return resultPessoaCpf.rowCount > 0;
};

/* funcao auxiliar para checar se o login ja foi cadastrado no banco de dados */
const checkLoginBD = async (login, id) => {
  const resultProfissionalLogin = await pool.query(selectProfissionalByLoginId, [login, id]);
  return resultProfissionalLogin.rowCount > 0;
};

/* funcao auxiliar para checar se o email ja foi cadastrado no banco de dados */
const checkEmailBD = async (email, id) => {
  const resultProfissionalEmail = await pool.query(selectProfissionalByEmailId, [email, id]);
  return resultProfissionalEmail.rowCount > 0;
};

// ------------------------- EXPORTS ------------------------------

module.exports = {
  getProfissionaisBD,
  getProfissionalById,
  updatePessoaBD,
  updateProfissionalBD,
  deletePessoaBD,
  checkCpfBD,
  checkLoginBD,
  checkEmailBD,
};
