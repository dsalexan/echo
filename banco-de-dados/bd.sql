DROP TABLE aluno_turma;
DROP TABLE compromisso;
DROP TABLE horario_turma;
DROP TABLE horario;
DROP TABLE turma;
DROP TABLE pre_req;
DROP TABLE materia;
DROP TABLE email_professor;
DROP TABLE professor;
DROP TABLE sala;
DROP TABLE aluno;

CREATE TABLE aluno (
	ra_aluno CHAR[6] PRIMARY KEY,
	nome TEXT NOT NULL,
	login_intranet TEXT NOT NULL UNIQUE,
	email TEXT NOT NULL UNIQUE
);
INSERT INTO aluno (ra_aluno, nome, login_intranet, email) VALUES
('000000', 'Usuario0', 'user0', 'user0@gmail.com'),
('111111', 'Usuario1', 'user1', 'user1@gmail.com'),
('222222', 'Usuario2', 'user2', 'user2@gmail.com'),
('333333', 'Usuario3', 'user3', 'user3@gmail.com'),
('444444', 'Usuario4', 'user4', 'user4@gmail.com'),
('555555', 'Usuario5', 'user5', 'user5@gmail.com'),
('666666', 'Usuario6', 'user6', 'user6@gmail.com'),
('777777', 'Usuario7', 'user7', 'user7@gmail.com'),
('888888', 'Usuario8', 'user8', 'user8@gmail.com'),
('999999', 'Usuario9', 'user9', 'user9@gmail.com');

CREATE TABLE sala (
	id_sala SERIAL PRIMARY KEY,
	numero VARCHAR[5] NOT NULL,
	unidade VARCHAR[20] NOT NULL,
	capacidade VARCHAR[4],
	descricao TEXT,
	UNIQUE (numero, unidade)
);
INSERT INTO sala (numero, unidade, capacidade, descricao) VALUES
('201', 'Parque Tecnologico', '50', NULL),
('202', 'Parque Tecnologico', '100', NULL),
('203', 'Parque Tecnologico', '50', NULL),
('204', 'Parque Tecnologico', '100', NULL),
('205', 'Parque Tecnologico', '50', NULL),
('206', 'Parque Tecnologico', '100', NULL),
('207', 'Parque Tecnologico', '50', NULL),
('208', 'Parque Tecnologico', '100', NULL),
('209', 'Parque Tecnologico', '50', NULL),
('210', 'Parque Tecnologico', '100', NULL);

CREATE TABLE professor (
	id_professor SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	lattes TEXT UNIQUE,
	area_atuacao TEXT,
	id_sala INTEGER REFERENCES sala(id_sala) NOT NULL
);
INSERT INTO professor (nome, lattes, area_atuacao, id_sala) VALUES
('Professor0', 'linklattes0', 'area0', 0),
('Professor1', 'linklattes1', 'area1', 0),
('Professor2', 'linklattes2', 'area2', 1),
('Professor3', 'linklattes3', 'area3', 2),
('Professor4', 'linklattes4', 'area4', 4),
('Professor5', 'linklattes5', 'area5', 4),
('Professor6', 'linklattes6', 'area6', 4),
('Professor7', 'linklattes7', 'area7', 5),
('Professor8', 'linklattes8', 'area8', 6),
('Professor9', 'linklattes9', 'area9', 9);

CREATE TABLE email_professor (
	id_email SERIAL PRIMARY KEY,
	id_professor INTEGER REFERENCES professor(id_professor) NOT NULL,
	email TEXT NOT NULL UNIQUE
);
INSERT INTO email_professor (id_professor, email) VALUES
(0, 'prof0@unifesp.br'),
(0, 'prof0@gmail.com'),
(0, 'prof0@hotmail.com'),
(1, 'prof1@unifesp.br'),
(1, 'prof1@gmail.com'),
(2, 'prof2@hotmail.com'),
(3, 'prof3@unifesp.br'),
(4, 'prof4@gmail.com'),
(5, 'prof5@hotmail.com'),
(6, 'prof6@hotmail.com');

CREATE TABLE materia (
	id_materia SERIAL PRIMARY KEY,
	nome TEXT NOT NULL UNIQUE,
	creditos INTEGER NOT NULL CHECK (creditos > 0)
);

CREATE TABLE pre_req (
	id_materia INTEGER REFERENCES materia(id_materia),
	id_pre_req INTEGER REFERENCES materia(id_materia),
	PRIMARY KEY(id_materia, id_pre_req)
);

CREATE TABLE turma (
	id_turma SERIAL PRIMARY KEY,
	id_materia INTEGER REFERENCES materia(id_materia) NOT NULL,
	id_professor INTEGER REFERENCES professor(id_professor) NOT NULL
);

CREATE TABLE horario (
	id_horario SERIAL PRIMARY KEY,
	dia_semana CHARACTER[3] NOT NULL,
	hora TIME NOT NULL CHECK ((hora >= '08:00') AND (hora <= '21:00'))
);

create table horario_turma (
	id_turma INTEGER REFERENCES turma(id_turma) NOT NULL,
	id_horario INTEGER REFERENCES horario(id_horario),
	id_sala INTEGER REFERENCES sala(id_sala),
	PRIMARY KEY(id_horario, id_sala)
);

CREATE TABLE compromisso (
	id_compromisso SERIAL PRIMARY KEY,
	id_turma INTEGER REFERENCES turma(id_turma) NOT NULL,
	nome TEXT NOT NULL,
	data DATE NOT NULL,
	id_sala INTEGER REFERENCES sala(id_sala),
	informacoes TEXT
);	

CREATE TABLE aluno_turma (
	ra_aluno INTEGER REFERENCES aluno(ra_aluno),
	id_turma INTEGER REFERENCES turma(id_turma),
	faltas INTEGER DEFAULT 0 CHECK (faltas >= 0),
	PRIMARY KEY(ra_aluno, id_turma)
);

-- ou então

CREATE TABLE cardapio (
    data JSONB
);


CREATE TABLE saldo (
    ra_aluno INT,
    quantidade INT NOT NULL,
    restaurante VARCHAR(50) NOT NULL,
    validade DATE NOT NULL,
    campus VARCHAR(50) NOT NULL,

    PRIMARY KEY (ra_aluno),
    FOREIGN KEY (ra_aluno) REFERENCES aluno (ra_aluno)
);
