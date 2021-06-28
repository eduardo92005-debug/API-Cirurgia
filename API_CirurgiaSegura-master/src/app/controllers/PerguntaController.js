const express = require('express');

const authMiddleware = require('../middlewares/auth');

const {
  getPerguntaBD,
  getPerguntasBD,
} = require('../logic/PerguntaLogic');

const router = express.Router();

//router.use(authMiddleware)

// -------------------------- ROUTERS ----------------------------------------

router.get('/', async (req, res) => {
  try {
    const format = await getPerguntasBD();
    return res.status(200).send(format);
  } catch (err) {
    //console.log(err);
    return res.status(400).send({
      error: 'Erro ao acessar rota',
      msgError: err,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const format = await getPerguntaBD(id);
    return res.status(200).send(format);
  } catch (err) {
    // console.log(err);
    return res.status(400).send({
      error: 'Erro ao acessar rota',
      msgError: err,
    });
  }
});

module.exports = app => app.use('/perguntas', router);
