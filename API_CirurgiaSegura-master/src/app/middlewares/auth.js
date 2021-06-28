const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

/* middleware para verificar se o usuario tem um token e se ele é valido */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    /* erro 401 é de autorizacao */
    return res.status(401).send({ error: 'O token não foi informado' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Erro no token' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token mal formatado' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    /* decode.id vem do authController onde
           passamos id: enfermeiro.id_pessoa */
    req.enfermeiroId = decoded.id;
    return next();
  });
  return res.status(401).send({ error: 'Token inválido' });
};
