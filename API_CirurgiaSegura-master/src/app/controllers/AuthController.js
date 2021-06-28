const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {

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

} = require('../logic/AuthLogic');


/* configuração de autenticação */
const authConfig = require('../../config/auth');

/* configuração de envio de email */
const emailConfig = require('../../config/emailconfig');

/* modulo de envio de email */
const {
  createTransport,
  getHtml,
  createMail,
} = require('../../modules/mailer');

const router = express.Router();

// --------------------------- CRYPTO ----------------------------------------

/* funcao auxiliar para gerar tokens baseado nos parametros do profissional */
const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
  expiresIn: 86400,
});

/* funcao auxiliar para encriptar a senha do profissional */
const cryptSenha = async senha => await bcrypt.hash(senha, 10);

// -------------------------- ROUTERS ----------------------------------------
const radix = 10;
/* rota para criar um registro de profissional */
router.post('/register', async (request, response) => {
  try {
    const {
      cpf, name, email, senha, login, profissao,
    } = request.body;

    const isCpfUsed = await checkCpfBD(cpf);
    const isLoginUsed = await checkLoginBD(login);
    const isEmailUsed = await checkEmailBD(email);

    /* encriptar a senha antes de por no bd */
    const senhaCryptBd = await cryptSenha(senha);

    if (isCpfUsed) {
      return response.status(400).send({ error: 'CPF já existe no sistema' });
    } if (isLoginUsed) {
      return response.status(400).send({ error: 'Login já existe no sistema' });
    } if (isEmailUsed) {
      return response.status(400).send({ error: 'Email já existe no sistema' });
    }
    // não pode inserir antes de checar cpf, login e email

    const resultPessoa = await insertPessoaBD(cpf, name, email);

    await insertProfissionalBD(senhaCryptBd, login, profissao, resultPessoa.rows[0].id_pessoa);

    const profissional = await findProfissional(login);

    /* tx_senha recebe undefined pois não quero exibir a senha  */
    profissional.tx_senha = undefined;

    /* a resposta da api é o profissional mais o token de autenticacao */
    /* status 201 significa status de criacao */
    return response.status(201).send({
      profissional,
      token: generateToken({ id: profissional.id_pessoa }),
    });
  } catch (err) {
    // console.log(err);
    return response.status(400).send({
      error: 'Registro Falhou',
      msgErro: err,
    });
  }
});

/* rota para criar uma autenticacao de profissional */
router.post('/authenticate', async (request, response) => {
  try {
    const { login, senha } = request.body;
    const isLoginValid = await checkLoginBD(login);

    if (!isLoginValid) {
      /* caso o login nao exista no bd é enviado uma bad request error 400 */
      return response.status(400).send({ error: 'Login não encontrado' });
    }

    const profissional = await findProfissional(login);

    /* usando bcrypt.compare pq a senha foi criptografada */
    if(!await bcrypt.compare(senha, profissional.tx_senha)) {
      return response.status(400).send({ error: 'Senha inválida' });
    }
    /* tx_senha recebe undefined pois não quero exibir a senha  */
    profissional.tx_senha = undefined;

    return response.status(200).send({
      profissional,
      token: generateToken({ id: profissional.id_pessoa }),
    });
  } catch (err) {
    // console.log(err);
    return response.status(400).send({ error: 'Autenticação Falhou' });
  }
});


/* rota para recuperar a senha do profissional */
router.post('/recovery', async (req, res) => {
  try {
    const { email } = req.body;
    const { emailChange, passEmailChange } = emailConfig;

    const isEmailUsed = await checkEmailBD(email);

    if (!isEmailUsed) {
      return res.status(400).send({ error: 'Email não encontrado sistema' });
    }

    /* profissional a ter o token atualizado */
    const profissional = await findProfissionalByEmail(email);

    const token = generateTokenEmail();

    const html = getHtml(token, profissional.tx_nome);
    const transport = createTransport(emailChange, passEmailChange);
    const mail = createMail(emailChange, email, html);

    // Envio do email
    transport.sendMail(mail, async (err, info) => {
      if (err) {
        return res.status(500).send({ error: err, message: 'Erro ao enviar email!' });
      }

      /* atualizando o token */
      await updateToken(token, profissional.id_pessoa);

      return res.status(200).send({
        message: 'Email enviado com sucesso!',
        profissional,
      });
    });
    // return res.status(200).send({ ok: 'Email existe no sistema'})
  } catch (err) {
    // console.log(err);
    return res.status(400).send({ error: 'A recuperação de senha Falhou [etapa 1]' });
  }
});

router.post('/token/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, radix); /* id_pessoa */
    const { token } = req.body;

    const isTokenValid = await checkTokenBD(id, token);

    if (!isTokenValid) {
      return res.status(400).send({ error: 'Código de verificação não encontrado sistema' });
    }
    return res.status(200).send({ ok: 'Encontrado código de verificação no sistema' });
  } catch (err) {
    // console.log(err);
    return res.status(400).send({ error: 'A recuperação de senha Falhou [etapa 2]' });
  }
});

router.post('/password/:id', async (req, res) => {
  try {
    /* id_pessoa */
    const id = parseInt(req.params.id, radix);
    const { senha, token } = req.body;

    /* encriptar a senha antes de por no bd */
    const senhaCryptBd = await cryptSenha(senha);

    /* atualizando a senha */
    await updateSenha(senhaCryptBd, token, id);

    /* atualizando o token para null, pois a senha ja foi atualizada */
    await updateToken(null, id);

    /* removendo o token do bando de dados */
    return res.status(200).send({ ok: 'Senha alterada com sucesso' });
  } catch (err) {
    // console.log(err);
    return res.status(400).send({ error: 'Não foi possivel alterar a senha [etapa 3]' });
  }
});


module.exports = app => app.use('/auth', router);
