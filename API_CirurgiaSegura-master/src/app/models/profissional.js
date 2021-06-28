const selectPessoaByCpf = 'SELECT * FROM cirurgia.pessoa \
        WHERE cpf = $1';

const selectProfissionalByLogin = 'SELECT * FROM cirurgia.profissional_saude \
        WHERE tx_login = $1';

const insertPessoa = 'INSERT INTO cirurgia.pessoa (cpf, tx_nome, tx_email) \
        VALUES ($1, $2, $3) RETURNING id_pessoa';

const insertProfissional = 'INSERT INTO cirurgia.profissional_saude (tx_senha, tx_login, tx_profissao, id_pessoa) \
        VALUES ($1, $2, $3, $4)';

/* nao pode dar select na senha, mesmo ela estando criptografada */
const selectProfissionalJoinPessoa = 'SELECT id_pessoa, id_profissional_saude, tx_profissao, tx_login, cpf, tx_nome, tx_email \
        FROM cirurgia.pessoa JOIN cirurgia.profissional_saude \
        USING (id_pessoa) ORDER BY id_profissional_saude ASC';

const selectProfissionalJoinGrupo = 'SELECT id_profissional_saude, tx_profissao \
        FROM cirurgia.profissional_saude JOIN cirurgia.grupo_profissional \
        USING (id_profissional_saude)';
const selectProfissionalJoinGrupoByCod = 'SELECT id_profissional_saude, tx_nome \
        FROM cirurgia.profissional_saude JOIN cirurgia.grupo_profissional \
        USING (id_profissional_saude) WHERE tx_cod_grupo = $1'
const selectProfissionalJoinPessoaById = 'SELECT id_pessoa, id_profissional_saude, tx_profissao, tx_login, cpf, tx_nome, tx_email \
        FROM cirurgia.pessoa JOIN cirurgia.profissional_saude \
        USING (id_pessoa) WHERE id_pessoa = $1';

const selectProfissionalJoinPessoaByLogin = 'SELECT tx_senha, id_pessoa, id_profissional_saude, tx_profissao, tx_nome, tx_login, cpf, tx_email \
        FROM cirurgia.pessoa JOIN cirurgia.profissional_saude \
        USING (id_pessoa) WHERE tx_login = $1';

const selectProfissionalByEmail = 'SELECT id_pessoa, tx_nome \
        FROM cirurgia.pessoa JOIN cirurgia.profissional_saude \
        USING (id_pessoa) WHERE tx_email = $1';

const updatePessoaById = 'UPDATE cirurgia.pessoa SET cpf = $1, tx_nome = $2, tx_email = $3 \
        WHERE id_pessoa = $4';

const updateProfissionalById = 'UPDATE cirurgia.profissional_saude SET tx_profissao = $1, tx_login = $2 \
        WHERE id_pessoa = $3';

/* quando deleto a pessoa automaticamente deleta ela da tabela profissional_saude */
const deletePessoaById = 'DELETE FROM cirurgia.pessoa WHERE id_pessoa = $1';

const selectPessoaByCpfId = 'SELECT cpf FROM cirurgia.pessoa \
        WHERE cpf = $1 and id_pessoa != $2';

const selectProfissionalByLoginId = 'SELECT tx_login FROM cirurgia.profissional_saude \
        WHERE tx_login = $1 and id_pessoa != $2';

const selectProfissionalByEmailId = 'SELECT tx_email FROM cirurgia.pessoa \
        WHERE tx_email = $1 and id_pessoa != $2';

/* querys para trocar senha */ /*
const updateTokenProfissionalById = 'UPDATE cirurgia.profissional_saude SET tx_token = $1\
WHERE id_pessoa = $2';

const selectTokenById = 'SELECT id_pessoa FROM cirurgia.pessoa JOIN cirurgia.profissional_saude \
USING(id_pessoa) WHERE id_pessoa = $1 AND tx_token = $2';

const updateSenhaProfissionalById = 'UPDATE cirurgia.profissional_saude SET tx_senha = $1\
WHERE tx_token = $2 AND id_pessoa = $3 '; */


module.exports = {

  selectPessoaByCpf,
  selectProfissionalByLogin,
  insertPessoa,
  insertProfissional,
  selectProfissionalJoinPessoa,
  selectProfissionalJoinPessoaById,
  selectProfissionalJoinPessoaByLogin,
  selectProfissionalByEmail,
  updatePessoaById,
  updateProfissionalById,
  deletePessoaById,
  selectProfissionalJoinGrupo,
  selectProfissionalJoinGrupoByCod,

  selectPessoaByCpfId,
  selectProfissionalByLoginId,
  selectProfissionalByEmailId,

  /*updateTokenProfissionalById,
  selectTokenById,
  updateSenhaProfissionalById, */

};
