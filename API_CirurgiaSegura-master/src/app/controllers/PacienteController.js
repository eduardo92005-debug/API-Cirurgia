const express = require('express');

const authMiddleware = require('../middlewares/auth')

const {

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

} = require('../logic/PacienteLogic');

const router = express.Router();

/* essa parte so é acessada se o enfermeiro estiver autenticado */
router.use(authMiddleware)

// -------------------------- ROUTERS ----------------------------------------
const radix = 10;
/* exibe todos pacientes cadastrados */
router.get('/', async (req, res) => {
  try {
    const resultPacientes = await getPacientesBD();
    return res.status(200).send({ pacientes: resultPacientes });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao listar os pacientes' });
  }
});

/* exibe um paciente com base em seu id */
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, radix);
    const resultPaciente = await getPacienteBD(id);
    return res.status(200).send({ paciente: resultPaciente });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao listar o paciente' });
  }
});

/* cadastra um novo paciente */
router.post('/register', async (req, res) => {
  try {
    const {
      cpf,
      rg,
      name,
      email,
      nascimento,
      sexo,
      raca,
      situacaoConjugal,
      endereco,
      telefone,
    } = req.body;

    const isCpfUsed = await checkCpfBD(cpf);
    const isRgUsed = await checkRgBD(rg);

    if (isCpfUsed) {
      return res.status(400).send({ error: 'CPF já existe no sistema' });
    } if (isRgUsed) {
      return res.status(400).send({ error: 'RG já existe no sistema' });
    }

    const resultPessoa = await insertPessoaBD(cpf, rg, name, email);

    const resultPaciente = await insertPacienteBD(nascimento, sexo, raca,
      situacaoConjugal, endereco, telefone, resultPessoa.id_pessoa);

    return res.status(200).send({
      ok: `Paciente adicionado com id_pessoa: ${resultPessoa.id_pessoa}, id_paciente ${resultPaciente.id_paciente}`,
    });
  } catch (err) {
    // console.log(err);
    return res.status(400).send({
      error: 'Registro do paciente falhou',
      msgErro: err,
    });
  }
});

/* update de paciente com base em seu id */
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, radix);
    const {
      cpf,
      rg,
      name,
      email,
      nascimento,
      sexo,
      raca,
      situacaoConjugal,
      endereco,
      telefone,
    } = req.body;

    const isCpfUsed = await checkCpfBDPut(cpf, id);
    const isRgUsed = await checkRgBDPut(rg, id);

    if (isCpfUsed) {
      return res.status(400).send({ error: 'CPF já existe no sistema' });
    } if (isRgUsed) {
      return res.status(400).send({ error: 'RG já existe no sistema' });
    }

    await updatePessoa(name, email, cpf, rg, id);

    await updatePaciente(nascimento, sexo, raca,
      situacaoConjugal, endereco, telefone, id);

    return res.status(200).send({ ok: `Atualizado o paciente de id_pessoa: ${id}` });
  } catch (err) {
    // console.log(err);
    return res.status(400).send({
      error: 'Atualização do paciente falhou',
      msgErro: err,
    });
  }
});

/* deleta um paciente com base em seu id */
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, radix);
    await deletePessoa(id);
    return res.status(200).send({ ok: `Deletado paciente com id: ${id}` });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao deletar o paciente' });
  }
});

module.exports = app => app.use('/pacientes', router);
