const { pool } = require('../../database/index');

const {

  insertPessoa,
  insertProfissional,
  selectPessoaByCpf,
  selectProfissionalByLogin,
  selectProfissionalJoinPessoaByLogin,
  selectProfissionalByEmail,

  updateTokenProfissionalById,
  selectTokenById,
  updateSenhaProfissionalById,

} = require('../models/profissional');

// ------------------------- REGISTER AND AUTHENTICATE ------------------------------
const insertPessoaBD = async (cpf, name, email) => {
  const resultPessoa = await pool.query(insertPessoa, [cpf, name, email]);
  return resultPessoa;
};
const insertProfissionalBD = async (senhaCryptBd, login, profissao, id) => {
  const resultProfissional = await pool.query(insertProfissional, [senhaCryptBd, login, profissao, id]);
  return resultProfissional;
};

/* funcao auxiliar para checar se o cpf ja foi cadastrado no banco de dados */
const checkCpfBD = async (cpf) => {
  const resultPessoaCpf = await pool.query(selectPessoaByCpf, [cpf]);
  return resultPessoaCpf.rowCount > 0;
};

/* funcao auxiliar para checar se o login ja foi cadastrado no banco de dados */
const checkLoginBD = async (login) => {
  const resultProfissionalLogin = await pool.query(selectProfissionalByLogin, [login]);
  return resultProfissionalLogin.rowCount > 0;
};

/* funcao auxiliar para checar se o email ja foi cadastrado no banco de dados */
const checkEmailBD = async (email) => {
  const resultProfissionalEmail = await pool.query(selectProfissionalByEmail, [email]);
  return resultProfissionalEmail.rowCount > 0;
};

/* funcao auxiliar para encontrar e retornar um profissional com base em seu login */
const findProfissional = async (login) => {
  const resultProfissionalLogin = await pool.query(selectProfissionalJoinPessoaByLogin, [login]);
  return resultProfissionalLogin.rows[0];
};

// ------------------ PASSWORD RECOVERY -----------------

/* funcao auxiliar para encontrar e retornar um profissional com base em seu email */
const findProfissionalByEmail = async (email) => {
  const resultProfissionalEmail = await pool.query(selectProfissionalByEmail, [email]);
  return resultProfissionalEmail.rows[0];
};

/* funcao auxiliar para checar se o token foi
solicitado e cadastrado no banco de dados */
const checkTokenBD = async (id, token) => {
  const resultToken = await pool.query(selectTokenById, [id, token]);
  return resultToken.rowCount > 0;
};

/* funcao auxiliar para atualizar o token de esqueci minha senha
    de um profissional com base em seu id_pessoa */
const updateToken = async (token, id) => {
  await pool.query(updateTokenProfissionalById, [token, id]);
};

/* funcao auxiliar para atualizar a senha
    de um profissional com base em seu id_pessoa */
const updateSenha = async (senha, token, id) => {
  await pool.query(updateSenhaProfissionalById, [senha, token, id]);
};

/* funcao auxiliar para gerar numeros aleatorios entre 0 e 9 */
const generateNumber = () => Math.floor((Math.random() * 10) % 10);

/* funcao auxiliar para gerar letras aleatorias */
const generateLetter = () => {
  const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const num = Math.floor(Math.random() * letter.length);
  return letter[num];
};

/* funcao auxiliar para gerar token a ser enviado para o email */
const generateTokenEmail = () => {
  const token = `${generateLetter()}${generateNumber()}${generateNumber()}${generateNumber()}${generateNumber()}${generateLetter()}`;
  return token;
};

// ------------------------- EXPORTS ------------------------------

module.exports = {

  insertPessoaBD,
  insertProfissionalBD,
  checkCpfBD,
  checkLoginBD,
  checkEmailBD,
  findProfissional,
  findProfissionalByEmail,
  checkTokenBD,
  updateToken,
  updateSenha,
  generateTokenEmail,
};
