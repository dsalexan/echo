DROP DATABASE IF EXISTS echo;

CREATE DATABASE echo;

USE echo;

GRADE

aluno
- id aluno
...

professor
- id professor
...

CREATE TABLE sala (
	id_sala SERIAL PRIMARY KEY,
	numero TEXT,
	capacidade TEXT,
	descricao TEXT
);

CREATE TABLE materia (
	id_materia SERIAL PRIMARY KEY,
	nome TEXT,
	creditos TEXT
);

CREATE TABLE pre_req (
	id_materia INTEGER REFERENCES materia(id_materia),
	id_pre_req INTEGER REFERENCES materia(id_materia)
);

CREATE TABLE turma (
	id_turma SERIAL PRIMARY KEY,
	id_materia INTEGER REFERENCES materia(id_materia),
	id_professor INTEGER REFERENCES professor(id_professor),
	id_sala INTEGER REFERENCES sala(id_sala)
);

CREATE TABLE horario (
	id_horario SERIAL PRIMARY KEY,
	dia_hora TEXT
);

CREATE TABLE horario_turma (
	id_turma INTEGER REFERENCES turma(id_turma),
	id_horario INTEGER REFERENCES horario(id_horario)
);

CREATE TABLE compromisso (
	id_compromisso SERIAL PRIMARY KEY,
	id_turma INTEGER REFERENCES turma(id_turma),
	nome TEXT,
	data DATE,
	id_sala INTEGER REFERENCES sala(id_sala),
	informacoes TEXT
);

CREATE TABLE aluno_turma (
	id_aluno INTEGER REFERENCES aluno(id_aluno),
	id_turma INTEGER REFERENCES turma(id_turma),
	faltas INTEGER
);

CREATE TABLE cardapio (
    id_cardapio INT AUTO_INCREMENT,
    prato_base VARCHAR(50) NOT NULL,
	prato_principal VARCHAR(50) NOT NULL,
	opcao_vegetariana VARCHAR(50) NOT NULL,
	guarnicao VARCHAR(50) NOT NULL,
	sobremesa VARCHAR(50) NOT NULL,
	semana INT NOT NULL,
	dia_semana VARCHAR(20) NOT NULL,
	tipo_refeicao VARCHAR(10) NOT NULL,

    PRIMARY KEY (id_cardapio)
);

-- ou então

CREATE TABLE cardapio (
    data JSONB
);


CREATE TABLE saldo (
    id_aluno INT,
    quantidade INT NOT NULL,
	restaurante VARCHAR(50) NOT NULL,
	validade DATE NOT NULL,
	campus VARCHAR(50) NOT NULL,

    PRIMARY KEY (id_aluno),
	FOREIGN KEY (id_aluno) REFERENCES aluno (id_aluno)
);


CREATE TABLE viagem (
	id_viagem SERIAL PRIMARY KEY,
	id_motorista INT NOT NULL,
	dia DATETIME NOT NULL,
	qtd_vagas INT NOT NULL,
	descricao VARCHAR(280),

	FOREIGN KEY(id_motorista) REFERENCES aluno (id_aluno)
);


CREATE TABLE reserva (
	id_reserva SERIAL PRIMARY KEY,
	id_viagem INT NOT NULL,
	id_passageiro INT NOT NULL,

	FOREIGN KEY(id_viagem) REFERENCES viagem (id_viagem),
	FOREIGN KEY(is_passageiro) REFERENCES aluno (id_aluno)
);