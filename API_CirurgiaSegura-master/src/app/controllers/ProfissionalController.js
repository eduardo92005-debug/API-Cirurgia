const express = require('express');

const authMiddleware = require('../middlewares/auth')

/* aqui onde funciona a logica do crud e outras coisas */
const {
  getProfissionaisBD,
  getProfissionalById,
  updatePessoaBD,
  updateProfissionalBD,
  deletePessoaBD,
  checkCpfBD,
  checkLoginBD,
  checkEmailBD,
} = require('../logic/ProfissionalLogic');

const router = express.Router();

/* essa parte so é acessada se o profissional estiver autenticado */
// router.use(authMiddleware)

// -------------------------- ROUTERS ----------------------------------------
const radix = 10;
/* exibe todos profissionais da saude cadastrados */
router.get('/', async (req, res) => {
  try {
    const resultProfissionais = await getProfissionaisBD();
    return res.status(200).send({ profissionais: resultProfissionais });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao listar os profissionais da saúde' });
  }
});

/* exibe um profissional com base em seu id */
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, radix);
    const resultProfissional = await getProfissionalById(id);
    return res.status(200).send({ profissional: resultProfissional });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao listar o profissional da saúde' });
  }
});

/* update de profissional da saude */
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, radix);
    // console.log(req.body);
    const {
      cpf, name, email, login, profissao,
    } = req.body;

    const isCpfUsed = await checkCpfBD(cpf, id);
    const isLoginUsed = await checkLoginBD(login, id);
    const isEmailUsed = await checkEmailBD(email, id);

    if (isCpfUsed) {
      return res.status(400).send({ error: 'CPF já existe no sistema' });
    } if (isLoginUsed) {
      return res.status(400).send({ error: 'Login já existe no sistema' });
    } if (isEmailUsed) {
      return res.status(400).send({ error: 'Email já existe no sistema' });
    }
    // não pode atualizar antes de checar cpf, login e email

    await updatePessoaBD(cpf, name, email, id);
    await updateProfissionalBD(profissao, login, id);

    return res.status(200).send({ ok: `Atualizado o profissional da saúde de id_pessoa: ${id}` });
  } catch (err) {
    // console.log(err);
    return res.status(400).send({
      error: 'Atualização do profissional de saúde falhou',
      msgErro: err,
    });
  }
});

// post n precisa pois ja foi feito na autenticacao

/* deleta um profissional com base em seu id */
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, radix);
    await deletePessoaBD(id);
    return res.status(200).send({ ok: `Deletado profissional da saúde com id: ${id}` });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao deletar o profissional da saúde' });
  }
});

module.exports = app => app.use('/profissionais', router);
