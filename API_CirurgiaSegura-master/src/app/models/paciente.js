const selectPessoaByCpf = 'SELECT * FROM cirurgia.pessoa \
        WHERE cpf = $1';

const selectPessoaByRg = 'SELECT * FROM cirurgia.pessoa \
        WHERE rg = $1';

const selectPacienteJoinPessoa = 'SELECT id_paciente, id_pessoa, cpf, \
        rg, tx_nome, tx_email, dt_nascimento, \
        tx_sexo, tx_raca, tx_situacao_conjugal, \
        tx_endereco, tx_telefone \
    FROM cirurgia.pessoa JOIN cirurgia.paciente USING(id_pessoa) \
       ORDER BY id_paciente ASC;';

const selectPacienteJoinPessoaById = 'SELECT * FROM cirurgia.pessoa JOIN cirurgia.paciente \
        USING (id_pessoa) WHERE id_pessoa = $1';

const insertPessoa = 'INSERT INTO cirurgia.pessoa (cpf, rg, tx_nome, tx_email) \
        VALUES ($1, $2, $3, $4) RETURNING id_pessoa';

const insertPaciente = 'INSERT INTO cirurgia.paciente (dt_nascimento, \
        tx_sexo, tx_raca, tx_situacao_conjugal, tx_endereco, tx_telefone, id_pessoa)\
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_paciente';

const updatePessoaById = 'UPDATE cirurgia.pessoa SET  tx_nome = $1, tx_email = $2, \
        cpf = $3, rg = $4 WHERE id_pessoa = $5';

const updatePacienteById = 'UPDATE cirurgia.paciente SET dt_nascimento = $1, \
        tx_sexo = $2,  tx_raca = $3, tx_situacao_conjugal = $4 , tx_endereco = $5, \
        tx_telefone = $6 WHERE id_pessoa = $7';

/* quando deleto a pessoa automaticamente deleta ela da tabela paciente */
const deletePessoaById = 'DELETE FROM cirurgia.pessoa WHERE id_pessoa = $1';


const selectPessoaByCpfId = 'SELECT cpf FROM cirurgia.pessoa \
        WHERE cpf = $1 and id_pessoa != $2';

const selectPessoaByRgId = 'SELECT rg FROM cirurgia.pessoa \
        WHERE rg = $1 and id_pessoa != $2';

module.exports = {

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

};
