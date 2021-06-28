const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

/* cros permite que todos endereços/urls/servidores/ips
    possam acessar esse backend */
const cors = require('cors');


app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());

app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API',
    documentation: 'ainda irei fazer',
  });
});

require('./app/controllers/index')(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}.`);
});
