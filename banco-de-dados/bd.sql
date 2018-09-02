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
	ra_aluno INTEGER PRIMARY KEY,
	nome TEXT NOT NULL,
	login_intranet TEXT NOT NULL UNIQUE,
	email TEXT NOT NULL UNIQUE
);

CREATE TABLE sala (
	id_sala SERIAL PRIMARY KEY,
	numero VARCHAR[5] NOT NULL,
	unidade VARCHAR[20] NOT NULL,
	capacidade VARCHAR[4],
	descricao TEXT,
	UNIQUE (numero, unidade)
);

CREATE TABLE professor (
	id_professor SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	lattes TEXT UNIQUE,
	area_atuacao TEXT,
	id_sala INTEGER REFERENCES sala(id_sala) NOT NULL
);

CREATE TABLE email_professor (
	id_email SERIAL PRIMARY KEY,
	id_professor INTEGER REFERENCES professor(id_professor) NOT NULL,
	email TEXT NOT NULL UNIQUE
);

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
