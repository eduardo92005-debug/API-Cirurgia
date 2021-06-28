CREATE SCHEMA cirurgia;


CREATE TABLE cirurgia.pessoa (
    id_pessoa SERIAL,
    cpf VARCHAR (15) NOT NULL,
    rg VARCHAR (9),
    tx_nome VARCHAR (50) NOT NULL,
    tx_email VARCHAR (50),

    PRIMARY KEY (id_pessoa),
    UNIQUE (cpf),
    UNIQUE (rg),
    UNIQUE (tx_email)
);

CREATE TABLE cirurgia.profissional_saude (
    id_profissional_saude SERIAL,
    tx_profissao VARCHAR(110) NOT NULL,
    tx_login VARCHAR (20) NOT NULL,
    tx_senha VARCHAR (110) NOT NULL,
    tx_token VARCHAR(6),
    id_pessoa INT NOT NULL,

    PRIMARY KEY (id_profissional_saude),
    UNIQUE (tx_login),
CONSTRAINT fk_pessoa FOREIGN KEY (id_pessoa) REFERENCES cirurgia.pessoa(id_pessoa) ON DELETE CASCADE
);

CREATE TABLE cirurgia.paciente (
    id_paciente SERIAL,
    --in_cartao_sus VARCHAR (15) NOT NULL,
    dt_nascimento DATE NOT NULL,
    tx_sexo VARCHAR (1) NOT NULL,
    tx_raca VARCHAR (20) NOT NULL,
    tx_situacao_conjugal VARCHAR (11) NOT NULL,
    tx_endereco VARCHAR (220) NOT NULL,
    tx_telefone VARCHAR (15),
    id_pessoa INT NOT NULL,

    PRIMARY KEY (id_paciente),
    --UNIQUE (in_cartao_sus),
    CONSTRAINT fk_pessoa FOREIGN KEY (id_pessoa) REFERENCES cirurgia.pessoa(id_pessoa) ON DELETE CASCADE
);

CREATE TABLE cirurgia.procedimento(
    id_procedimento SERIAL,
    int_momento INT NOT NULL,
    dt_data DATE NOT NULL,
    tx_estado VARCHAR (3) NOT NULL,
    id_paciente INT NOT NULL,

    PRIMARY KEY(id_procedimento),
    CONSTRAINT fk_paciente FOREIGN KEY (id_paciente) REFERENCES cirurgia.paciente(id_paciente) ON DELETE CASCADE
);

CREATE TABLE cirurgia.grupo_profissional(
    tx_cod_grupo VARCHAR (45) NOT NULL,
    id_profissional_saude INT NOT NULL,
    id_procedimento SERIAL,

    CONSTRAINT fk_procedimento FOREIGN KEY (id_procedimento) REFERENCES cirurgia.procedimento(id_procedimento) ON DELETE CASCADE,
    CONSTRAINT fk_profissional_saude FOREIGN KEY (id_profissional_saude) REFERENCES cirurgia.profissional_saude(id_profissional_saude) ON DELETE CASCADE
);

CREATE TABLE cirurgia.pergunta_cirurgia(
	id_pergunta VARCHAR(8) NOT NULL,
  	tx_pergunta VARCHAR(550) NOT NULL,
  	tx_tipo_pergunta VARCHAR(3) NOT NULL,
  	in_teclado_numerico INT NOT NULL,
    bl_notificar BOOLEAN NOT NULL,
	
PRIMARY KEY (id_pergunta)
);

CREATE TABLE cirurgia.alternativa_cirurgia(
	id_alternativa VARCHAR(12) NOT NULL,
    id_pergunta VARCHAR(8) NOT NULL,
	tx_alternativa VARCHAR(220) NOT NULL,
    bl_alternativa_notificar BOOLEAN,

	PRIMARY KEY (id_alternativa),
	CONSTRAINT fk_pergunta FOREIGN KEY (id_pergunta) REFERENCES cirurgia.pergunta_cirurgia(id_pergunta) ON DELETE CASCADE
);


CREATE TABLE cirurgia.resposta_cirurgia(
	id_procedimento SERIAL,
  	id_pergunta VARCHAR(8) NOT NULL,

  	CONSTRAINT fk_procedimento FOREIGN KEY (id_procedimento) REFERENCES cirurgia.procedimento(id_procedimento) ON DELETE CASCADE,
CONSTRAINT fk_pergunta FOREIGN KEY (id_pergunta) REFERENCES cirurgia.pergunta_cirurgia(id_pergunta) ON DELETE CASCADE
);

CREATE TABLE cirurgia.resposta_objetiva (
    id_objetiva SERIAL,
    id_procedimento SERIAL,
    id_pergunta VARCHAR(8) NOT NULL,
    tx_resposta VARCHAR(20) NOT NULL,

    PRIMARY KEY (id_objetiva),
    CONSTRAINT fk_procedimento FOREIGN KEY (id_procedimento) REFERENCES cirurgia.procedimento(id_procedimento) ON DELETE CASCADE,
    CONSTRAINT fk_pergunta FOREIGN KEY (id_pergunta) REFERENCES cirurgia.pergunta_cirurgia(id_pergunta) ON DELETE CASCADE

);

CREATE TABLE cirurgia.resposta_subjetiva (
    id_subjetiva SERIAL,
    id_procedimento INT NOT NULL,
    id_pergunta VARCHAR(8) NOT NULL,
    tx_resposta VARCHAR(100) NOT NULL,

    PRIMARY KEY (id_subjetiva),
    CONSTRAINT fk_procedimento FOREIGN KEY (id_procedimento) REFERENCES cirurgia.procedimento(id_procedimento) ON DELETE CASCADE,
    CONSTRAINT fk_pergunta FOREIGN KEY (id_pergunta) REFERENCES cirurgia.pergunta_cirurgia(id_pergunta) ON DELETE CASCADE

);

CREATE TABLE cirurgia.notificacao(
    id_notificacao SERIAL,
    int_momento INT NOT NULL,
    dt_data DATE NOT NULL,
    tx_notificacao VARCHAR(220) NOT NULL,
    tx_resposta VARCHAR(50) NOT NULL,

    CONSTRAINT pk_notificacao PRIMARY KEY (id_notificacao),
);

