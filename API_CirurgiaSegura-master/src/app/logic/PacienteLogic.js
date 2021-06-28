const { pool } = require('../../database/index');

const {

  selectPessoaByCpf,
  selectPessoaByRg,
  selectPacienteJoinPessoa,
  selectPacienteJoinPessoaById,
  insertPessoa,
  insertPaciente,
  updatePessoaById,
  updatePacienteById,
  deletePessoaById,
  selectPessoaByCpfId,
  selectPessoaByRgId,

} = require('../models/paciente');

// ------------------------- GET ------------------------------

const getPacientesBD = async () => {
  const resultPacientes = await pool.query(selectPacienteJoinPessoa);
  return resultPacientes.rows;
};

const getPacienteBD = async (id) => {
  const resultPaciente = await pool.query(selectPacienteJoinPessoaById, [id]);
  return resultPaciente.rows[0];
};

// ------------------------- CREATE ------------------------------

const insertPessoaBD = async (cpf, rg, name, email) => {
  const resultPessoa = await pool.query(insertPessoa, [cpf, rg, name, email]);
  return resultPessoa.rows[0];
};

const insertPacienteBD = async (nascimento, genero, raca, situacaoConjugal,
  endereco, telefone, id) => {
  const resultPaciente = await pool.query(insertPaciente, [nascimento, genero, raca,
    situacaoConjugal, endereco, telefone, id,
  ]);
  return resultPaciente.rows[0];
};

// ------------------------- UPDATE ------------------------------

const updatePessoa = async (name, email, cpf, rg, id) => {
  await pool.query(updatePessoaById, [name, email, cpf, rg, id]);
};

const updatePaciente = async (nascimento, genero, raca, situacaoConjugal,
  endereco, telefone, id) => {
  await pool.query(updatePacienteById, [nascimento, genero, raca,
    situacaoConjugal, endereco, telefone, id,
  ]);
};

// ------------------------- DELETE ------------------------------

const deletePessoa = async (id) => {
  await pool.query(deletePessoaById, [id]);
};

// ------------------------- CHEKIN BD ------------------------------

/* funcao auxiliar para checar se o cpf ja foi cadastrado no banco de dados */
const checkCpfBD = async (cpf) => {
  const resultPessoaCpf = await pool.query(selectPessoaByCpf, [cpf]);
  return resultPessoaCpf.rowCount > 0;
};

/* funcao auxiliar para checar se o rg ja foi cadastrado no banco de dados */
const checkRgBD = async (rg) => {
  const resultPessoaRg = await pool.query(selectPessoaByRg, [rg]);
  return resultPessoaRg.rowCount > 0;
};

/* funcao auxiliar para checar se o cpf ja foi cadastrado no banco de dados */
const checkCpfBDPut = async (cpf, id) => {
  const resultPessoaCpf = await pool.query(selectPessoaByCpfId, [cpf, id]);
  return resultPessoaCpf.rowCount > 0;
};

/* funcao auxiliar para checar se o rg ja foi cadastrado no banco de dados */
const checkRgBDPut = async (rg, id) => {
  const resultPessoaRg = await pool.query(selectPessoaByRgId, [rg, id]);
  return resultPessoaRg.rowCount > 0;
};

// ------------------------- EXPORTS ------------------------------

module.exports = {

  getPacientesBD,
  getPacienteBD,
  insertPessoaBD,
  insertPacienteBD,
  updatePessoa,
  updatePaciente,
  deletePessoa,
  checkCpfBD,
  checkRgBD,
  checkCpfBDPut,
  checkRgBDPut,

};
