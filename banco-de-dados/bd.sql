DROP TABLE IF EXISTS reserva;
DROP TABLE IF EXISTS viagem;
DROP TABLE IF EXISTS localidade;
DROP TABLE IF EXISTS cardapio;
DROP TABLE IF EXISTS aluno_turma;
DROP TABLE IF EXISTS evento_turma;
DROP TABLE IF EXISTS evento;
DROP TABLE IF EXISTS horario_turma;
DROP TABLE IF EXISTS horario;
DROP TABLE IF EXISTS turma;
DROP TABLE IF EXISTS pre_req;
DROP TABLE IF EXISTS uc;
DROP TABLE IF EXISTS professor;
DROP TABLE IF EXISTS aluno;

CREATE TABLE aluno (
	ra_aluno VARCHAR(10) PRIMARY KEY,
	nome TEXT NOT NULL,
	login_intranet TEXT NOT NULL UNIQUE,
	senha_intranet TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	telefone VARCHAR(15)
);
INSERT INTO aluno (ra_aluno, nome, login_intranet, senha_intranet, email) VALUES
('000000', 'Usuario0', 'user0', '123456', 'user0@gmail.com'),
('111111', 'Usuario1', 'user1', '123456', 'user1@gmail.com'),
('222222', 'Usuario2', 'user2', '123456', 'user2@gmail.com'),
('333333', 'Usuario3', 'user3', '123456', 'user3@gmail.com'),
('444444', 'Usuario4', 'user4', '123456', 'user4@gmail.com'),
('555555', 'Usuario5', 'user5', '123456', 'user5@gmail.com'),
('666666', 'Usuario6', 'user6', '123456', 'user6@gmail.com'),
('777777', 'Usuario7', 'user7', '123456', 'user7@gmail.com'),
('888888', 'Usuario8', 'user8', '123456', 'user8@gmail.com'),
('999999', 'Usuario9', 'user9', '123456', 'user9@gmail.com'),
('112344', 'Pedro Spoljaric Gomes', 'pedro.spoljaric', 'senha', 'pedrospoljaric@gmail.com');

CREATE TABLE professor (
	id_professor SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	sala INTEGER NOT NULL,
	lattes TEXT UNIQUE,
	email1 TEXT,
	email2 TEXT
);
INSERT INTO professor (nome, sala, lattes, email1) VALUES
('Professor0', 0, 'linklattes0', 'email0'),
('Professor1', 1, 'linklattes1', 'email1'),
('Professor2', 2, 'linklattes2', 'email2'),
('Professor3', 3, 'linklattes3', 'email3'),
('Professor4', 4, 'linklattes4', 'email4'),
('Professor5', 5, 'linklattes5', 'email5'),
('Professor6', 6, 'linklattes6', 'email6'),
('Professor7', 7, 'linklattes7', 'email7'),
('Professor8', 8, 'linklattes8', 'email8'),
('Professor9', 9, 'linklattes9', 'email9'),
('Fábio Silveira', 10, 'fabiolattes', 'fabio@gmail.com'),
('Bruno Kimura', 20, 'brunolattes', 'bruno@gmail.com'),
('Erwin Doescher', 30, 'erwinlattes', 'erwin@gmail.com'),
('Lauro Paulo', 40, 'laurolattes', 'lauro@gmail.com');

CREATE TABLE uc (
	id_uc SERIAL PRIMARY KEY,
	nome TEXT NOT NULL UNIQUE,
	creditos INTEGER NOT NULL CHECK (creditos > 0)
);

INSERT INTO uc
VALUES (DEFAULT, 'Logica de Programação', 4),
(DEFAULT, 'Algoritmos e Estrutura de Dados', 4),
(DEFAULT, 'Calculo em Uma Variavel', 6),
(DEFAULT, 'Fundamentos da Biologia Moderna', 4),
(DEFAULT, 'Series e Equaçoes Diferenciais', 4),
(DEFAULT, 'Engenharia de Software', 4),
(DEFAULT, 'Redes de Computadores', 4),
(DEFAULT, 'Cálculo Numérico', 4),
(DEFAULT, 'Laboratório de Sistemas Computacionais: Circuitos Digitais', 2);

CREATE TABLE pre_req (
	id_uc INTEGER REFERENCES uc(id_uc),
	id_pre_req INTEGER REFERENCES uc(id_uc),
	PRIMARY KEY(id_uc, id_pre_req)
);

INSERT INTO pre_req
VALUES (2, 1),
(5, 3),
(8, 3),
(6, 2);

CREATE TABLE turma (
	id_turma SERIAL PRIMARY KEY,
	id_uc INTEGER REFERENCES uc(id_uc) NOT NULL,
	id_professor INTEGER REFERENCES professor(id_professor) NOT NULL,
	nome VARCHAR(5) NOT NULL
);

INSERT INTO turma
VALUES (DEFAULT, 1, 1, 'IA'),
(DEFAULT, 2, 2, 'IB'),
(DEFAULT, 3, 3, 'N'),
(DEFAULT, 4 ,4, 'IC'),
(DEFAULT, 5, 5, 'N'),
(DEFAULT, 6, 11, 'I'),
(DEFAULT, 7, 12, 'I'),
(DEFAULT, 8, 13, 'N'),
(DEFAULT, 9, 14, 'IB');

CREATE TYPE dia_ordenado AS ENUM ('DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB');
CREATE TABLE horario (
	id_horario SERIAL PRIMARY KEY,
	dia_semana dia_ordenado NOT NULL,
	hora TIME NOT NULL CHECK ((hora >= '08:00') AND (hora <= '21:00'))
);

INSERT INTO horario
VALUES (DEFAULT, 'SEG', '10:00'),
(DEFAULT, 'SEG', '13:30'),
(DEFAULT, 'TER', '08:00'),
(DEFAULT, 'TER', '13:30'),
(DEFAULT, 'TER', '15:30'),
(DEFAULT, 'TER', '19:00'),
(DEFAULT, 'QUA', '13:30'),
(DEFAULT, 'QUA', '15:30'),
(DEFAULT, 'QUA', '19:00'),
(DEFAULT, 'QUI', '13:30'),
(DEFAULT, 'QUI', '19:00'),
(DEFAULT, 'QUI', '21:00'),
(DEFAULT, 'SEX', '13:30');


create table horario_turma (
	id_turma INTEGER REFERENCES turma(id_turma) NOT NULL,
	id_horario INTEGER REFERENCES horario(id_horario),
	sala INTEGER,
	PRIMARY KEY(id_horario, id_turma)
);

INSERT INTO horario_turma
VALUES (1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 2, 403),
(6, 7, 403),
(7, 4, 302),
(7, 10, 404),
(8, 6, 208),
(8, 11, 208),
(9, 8, 401);

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
	id_evento INTEGER REFERENCES evento(id_evento) NOT NULL,
	id_turma INTEGER REFERENCES turma(id_turma) NOT NULL,
	id_aluno VARCHAR(10),
	data DATE NOT NULL,
	sala INTEGER NOT NULL,
	descricao TEXT,
	PRIMARY KEY(id_evento, id_turma)
);

INSERT INTO evento_turma
VALUES (1, 1, '000000', '2018-09-29', 1, 'levar calculadora'),
(2, 2, '222222', '2018-10-01', 2, 'vale horas'),
(3, 3, '444444', '2018-10-15', 3, 'Encardenado'),
(1, 4, '666666', '2018-11-01', 4, 'até vetores'),
(2, 5, NULL, '2018-09-4', 4, 'Comparecer com Camiseta do grupo');

CREATE TABLE aluno_turma (
	ra_aluno VARCHAR(6) REFERENCES aluno(ra_aluno),
	id_turma INTEGER REFERENCES turma(id_turma),
	faltas INTEGER DEFAULT 0 CHECK (faltas >= 0),
	PRIMARY KEY(ra_aluno, id_turma)
);

INSERT INTO aluno_turma
VALUES('111111', 1, DEFAULT),
('222222', 2, DEFAULT),
('333333', 3, DEFAULT),
('444444', 4, DEFAULT),
('555555', 5, DEFAULT),
('112344', 6, DEFAULT),
('112344', 7, DEFAULT),
('112344', 8, DEFAULT),
('112344', 9, DEFAULT);

CREATE TABLE cardapio (
    tabela JSONB,
	data_inicio DATE NOT NULL,
	PRIMARY KEY(data_inicio)
);

INSERT INTO cardapio
VALUES
('{"prato_base": "Arroz e feijão", "prato_principal" : "Filé de frango", "opcao_vegetariana": "Kibe vegetariano",
"guarnicao": "Chuchu", "sobremesa": "Gelatina", "semana": "10", "dia_semana": "Segunda", "tipo_refeicao": "Almoço"}', '2018-10-15'),
('{"prato_base": "Arroz e feijão", "prato_principal" : "Filé de peixe", "opcao_vegetariana": "Couve-flor gratinada",
"guarnicao": "Couve", "sobremesa": "Gelatina", "semana": "10", "dia_semana": "Segunda", "tipo_refeicao": "Jantar"}', '2018-10-16'),
('{"prato_base": "Arroz e feijão", "prato_principal" : "Costela", "opcao_vegetariana": "Batata",
"guarnicao": "Farofa", "sobremesa": "Gelatina", "semana": "10", "dia_semana": "Terça", "tipo_refeicao": "Almoço"}', '2018-10-17'),
('{"prato_base": "Arroz e feijão", "prato_principal" : "Bisteca", "opcao_vegetariana": "Batata doce",
"guarnicao": "Farofa", "sobremesa": "Gelatina", "semana": "10", "dia_semana": "Terça", "tipo_refeicao": "Jantar"}', '2018-10-18'),
('{"prato_base": "Arroz e feijão", "prato_principal" : "Filé mignon", "opcao_vegetariana": "Rúcula",
"guarnicao": "Couve", "sobremesa": "Gelatina", "semana": "10", "dia_semana": "Quarta", "tipo_refeicao": "Almoço"}', '2018-10-19'),
('{"prato_base": "Arroz e feijão", "prato_principal" : "Contra filé", "opcao_vegetariana": "Ovo frito",
"guarnicao": "Couve", "sobremesa": "Abacaxi", "semana": "10", "dia_semana": "Quarta", "tipo_refeicao": "Jantar"}', '2018-10-20');

CREATE TABLE localidade(
	id_local SERIAL PRIMARY KEY,
	descricao VARCHAR(50) NOT NULL
);
INSERT INTO localidade (descricao) VALUES
('UNIFESP'),
('Satélite'),
('Parque Industrial'),
('Urbanova'),
('Chaparral'),
('Santa Inês');

CREATE TABLE viagem (
	id_viagem SERIAL PRIMARY KEY,
	id_motorista VARCHAR(6) NOT NULL,
	id_origem INT NOT NULL,
	id_destino INT NOT NULL,
	dia DATE NOT NULL,
	hora TIME NOT NULL,
	preco REAL NOT NULL,
	qtd_vagas INT NOT NULL CHECK ((qtd_vagas < 8) AND (qtd_vagas > 0)),
	descricao TEXT NOT NULL,

	FOREIGN KEY(id_motorista) REFERENCES aluno (ra_aluno),
	FOREIGN KEY(id_origem) REFERENCES localidade (id_local),
	FOREIGN KEY(id_destino) REFERENCES localidade (id_local)
);
INSERT INTO viagem (id_motorista, id_origem, id_destino, dia, hora, preco, qtd_vagas, descricao) VALUES
('000000', 2, 1, '2018-09-03', '07:30', 3.00, 4, 'saio do demoiselle'),
('111111', 2, 1, '2018-09-03', '09:30', 3.00, 4, 'saio do demoiselle'),
('555555', 2, 1, '2018-09-03', '23:00', 3.00, 4, 'saio do demoiselle'),
('000000', 1, 2, '2018-09-03', '15:30', 3.00, 4, 'deixo no demoiselle'),
('111111', 1, 2, '2018-09-03', '21:00', 3.00, 3, 'deixo no demoiselle');

CREATE TABLE reserva (
	id_viagem INT NOT NULL,
	id_passageiro VARCHAR(6) NOT NULL,

	FOREIGN KEY(id_viagem) REFERENCES viagem (id_viagem),
	FOREIGN KEY(id_passageiro) REFERENCES aluno (ra_aluno),
	PRIMARY KEY(id_viagem, id_passageiro)
);

INSERT INTO reserva (id_viagem, id_passageiro) VALUES
(1, 666666),
(1, 333333),
(1, 777777),
(2, 444444),
(2, 888888),
(4, 444444),
(4, 666666),
(3, 888888),
(5, 333333);