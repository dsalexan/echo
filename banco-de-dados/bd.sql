DROP VIEW compromissos;
DROP TABLE IF EXISTS reserva_divulgacao;
DROP TABLE IF EXISTS item_divulgacao;
DROP TABLE IF EXISTS tipo_divulgacao;
DROP TABLE IF EXISTS mensagem;
DROP TABLE IF EXISTS reserva;
DROP TABLE IF EXISTS origem;
DROP TABLE IF EXISTS destino;
DROP TABLE IF EXISTS viagem;
DROP TABLE IF EXISTS localidade;
DROP TABLE IF EXISTS cardapio;
DROP TABLE IF EXISTS aluno_turma;
DROP TABLE IF EXISTS evento_turma;
DROP TABLE IF EXISTS evento;
DROP TABLE IF EXISTS horario_turma;
DROP TABLE IF EXISTS horario;
DROP TYPE IF EXISTS dia_ordenado;
DROP TABLE IF EXISTS turma;
DROP TABLE IF EXISTS pre_req;
DROP TABLE IF EXISTS uc;
DROP TABLE IF EXISTS professor;
DROP TABLE IF EXISTS bug_report;
DROP TABLE IF EXISTS aluno;

CREATE TABLE aluno (
	ra_aluno VARCHAR(10) PRIMARY KEY,
	nome TEXT NOT NULL,
	login_intranet TEXT NOT NULL UNIQUE,
	senha_intranet TEXT NOT NULL,
	email TEXT NOT NULL,
	telefone VARCHAR(15)
);

CREATE TABLE professor (
	id_professor SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	area TEXT,
	sala TEXT,
	lattes TEXT,
	email1 TEXT,
	email2 TEXT
);

CREATE TABLE uc (
	id_uc SERIAL PRIMARY KEY,
	nome TEXT NOT NULL UNIQUE,
	creditos INTEGER NOT NULL CHECK (creditos > 0)
);

CREATE TABLE pre_req (
	id_uc INTEGER REFERENCES uc(id_uc),
	id_pre_req INTEGER REFERENCES uc(id_uc),
	PRIMARY KEY(id_uc, id_pre_req)
);

CREATE TABLE turma (
	id_turma SERIAL PRIMARY KEY,
	id_uc INTEGER REFERENCES uc(id_uc) NOT NULL,
	id_professor INTEGER REFERENCES professor(id_professor) NOT NULL,
	nome VARCHAR(5) NOT NULL
);

CREATE TYPE dia_ordenado AS ENUM ('DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB');
CREATE TABLE horario (
	id_horario SERIAL PRIMARY KEY,
	dia_semana dia_ordenado NOT NULL,
	hora TIME NOT NULL CHECK ((hora >= '08:00') AND (hora <= '21:00'))
);

create table horario_turma (
	id_turma INTEGER REFERENCES turma(id_turma) NOT NULL,
	id_horario INTEGER REFERENCES horario(id_horario),
	sala INTEGER,
	PRIMARY KEY(id_horario, id_turma)
);

CREATE TABLE evento(
	id_evento SERIAL PRIMARY KEY,
	descricao TEXT NOT NULL
);

INSERT INTO evento (descricao)
VALUES ('Prova'),
('Atividade'),
('Trabalho'),
('Cancelamento');

CREATE TABLE evento_turma (
	id_evento_turma SERIAL PRIMARY KEY,
	id_evento INTEGER REFERENCES evento(id_evento) NOT NULL,
	id_turma INTEGER REFERENCES turma(id_turma) NOT NULL,
	ra_aluno VARCHAR(10) REFERENCES aluno(ra_aluno),
	data DATE NOT NULL,
	hora TIME,
	sala INTEGER,
	descricao TEXT
);

CREATE TABLE aluno_turma (
	ra_aluno VARCHAR(6) REFERENCES aluno(ra_aluno),
	id_turma INTEGER REFERENCES turma(id_turma),
	faltas INTEGER DEFAULT 0 CHECK (faltas >= 0),
	PRIMARY KEY(ra_aluno, id_turma)
);

CREATE TABLE cardapio (
	id_cardapio SERIAL PRIMARY KEY,
    tabela JSONB,
	data_inicio DATE NOT NULL
);

CREATE TABLE localidade(
	id_local SERIAL PRIMARY KEY,
	descricao VARCHAR(50) NOT NULL
);
INSERT INTO localidade (descricao) VALUES
('UNIFESP'),
('Santa Inês'),
('Satélite'),
('Bosque'),
('Parque Industrial'),
('Jardim das Indústrias'),
('Jacareí'),
('Chaparral'),
('Urbanova'),
('Taubaté');

CREATE TABLE viagem (
	id_viagem SERIAL PRIMARY KEY,
	id_motorista VARCHAR(6) NOT NULL,
	dia DATE NOT NULL,
	preco REAL NOT NULL,
	qtd_vagas INT NOT NULL CHECK ((qtd_vagas < 8) AND (qtd_vagas > 0)),
	descricao TEXT NOT NULL,

	FOREIGN KEY(id_motorista) REFERENCES aluno (ra_aluno)
);

CREATE TABLE origem(
	id_viagem INT NOT NULL,
	id_origem INT NOT NULL,
	hora TIME NOT NULL,

	FOREIGN KEY(id_viagem) REFERENCES viagem (id_viagem),
	FOREIGN KEY(id_origem) REFERENCES localidade (id_local)
);

CREATE TABLE destino(
	id_viagem INT NOT NULL,
	id_destino INT NOT NULL,
	
	FOREIGN KEY(id_viagem) REFERENCES viagem (id_viagem),
	FOREIGN KEY(id_destino) REFERENCES localidade (id_local)
);

CREATE TABLE reserva (
	id_viagem INT NOT NULL,
	id_passageiro VARCHAR(6) NOT NULL,
	id_origem INT NOT NULL,
	id_destino INT NOT NULL,
	status_reserva BOOLEAN NOT NULL,

	FOREIGN KEY(id_viagem) REFERENCES viagem (id_viagem),
	FOREIGN KEY(id_passageiro) REFERENCES aluno (ra_aluno),
	FOREIGN KEY(id_origem) REFERENCES localidade (id_local),
	FOREIGN KEY(id_destino) REFERENCES localidade (id_local),
	PRIMARY KEY(id_viagem, id_passageiro)
);

CREATE TABLE mensagem(
	id_mensagem SERIAL PRIMARY KEY,
	id_destinatario VARCHAR(6) NOT NULL,
	mensagem TEXT NOT NULL,
	lida BOOLEAN NOT NULL,
	dia DATE,
	hora TIME,

	FOREIGN KEY (id_destinatario) REFERENCES aluno(ra_aluno)
);

CREATE TABLE tipo_divulgacao(
    id_tipo SERIAL PRIMARY KEY,
    nome_tipo VARCHAR(10) NOT NULL
);

INSERT INTO tipo_divulgacao (nome_tipo) VALUES
('Doce'),
('Salgado'),
('Empréstimo');


CREATE TABLE item_divulgacao (
    id_divulgacao SERIAL PRIMARY KEY,
    ra_aluno VARCHAR(6) NOT NULL,
    id_tipo INT NOT NULL,
    valor REAL,
    dia DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    descricao TEXT,
    quantidade INT,

    FOREIGN KEY(id_tipo) REFERENCES tipo_divulgacao(id_tipo),
    FOREIGN KEY(ra_aluno) REFERENCES aluno(ra_aluno)
);

CREATE TABLE reserva_divulgacao(
	id_reserva SERIAL PRIMARY KEY,
	id_divulgacao INT NOT NULL,
	ra_aluno_comprador VARCHAR(6) NOT NULL,
	quantidade INT,

	FOREIGN KEY(id_divulgacao) REFERENCES item_divulgacao(id_divulgacao),
	FOREIGN KEY(ra_aluno_comprador) REFERENCES aluno(ra_aluno)
);

CREATE TABLE bug_report(
	id_bug_report SERIAL PRIMARY KEY,
	ra_aluno VARCHAR(6) NOT NULL,
    dia DATE NOT NULL,
    hora TIME NOT NULL,
	tipo VARCHAR(50) NOT NULL,
	descricao TEXT NOT NULL,

	FOREIGN KEY(ra_aluno) REFERENCES aluno(ra_aluno)
);

CREATE VIEW compromissos AS
SELECT 'aula' AS tipo, ATu.ra_aluno, UC.nome AS nome_uc, NULL AS nome, T.nome AS turma, T.id_turma, H.dia_semana, NULL as dia, H.hora, HT.sala, NULL as descricao
FROM uc AS UC
    INNER JOIN turma AS T
        ON UC.id_uc = T.id_uc
    INNER JOIN horario_turma AS HT
        ON T.id_turma = HT.id_turma
    INNER JOIN horario AS H
        ON HT.id_horario = H.id_horario
    INNER JOIN aluno_turma AS ATu
        ON T.id_turma = ATu.id_turma
UNION
(SELECT 'evento' AS tipo, ET.ra_aluno, UC.nome AS nome_uc, E.descricao AS nome, T.nome as turma, T.id_turma, NULL as dia_semana, ET.data AS dia, ET.hora, ET.sala, ET.descricao
FROM evento_turma AS ET
    INNER JOIN turma AS T
        ON ET.id_turma = T.id_turma
    INNER JOIN evento AS E
        ON ET.id_evento = E.id_evento
    INNER JOIN uc AS UC
        ON T.id_uc = UC.id_uc)
ORDER BY dia, hora;