DROP VIEW IF EXISTS aula_termo;
DROP VIEW IF EXISTS visao_reserva;

DROP TABLE IF EXISTS reserva_sala;
DROP TABLE IF EXISTS aula;
DROP TABLE IF EXISTS sala;

DROP TABLE IF EXISTS uc_alias;
DROP TABLE IF EXISTS unidade_curricular;

DROP TABLE IF EXISTS analise;

DROP TABLE IF EXISTS unifesp;

CREATE TABLE unifesp(
  id_extracao SERIAL PRIMARY KEY,
  extracao TEXT NOT NULL,
  dados JSON NOT NULL,
  datahora TIMESTAMPTZ NOT NULL
);

CREATE TABLE analise(
  id_analise SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  base INTEGER REFERENCES unifesp(id_extracao),
  datahora TIMESTAMPTZ NOT NULL,
  logs JSON
);

CREATE TABLE unidade_curricular(
  hash INTEGER PRIMARY KEY,
  nome VARCHAR(300) NOT NULL,
  carga VARCHAR(5) NOT NULL,
  arquivo VARCHAR(300) NOT NULL,
  requisitos VARCHAR(300)[] NOT NULL,
  id_analise integer REFERENCES analise(id_analise)
);

CREATE TABLE uc_alias(
  id_alias SERIAL PRIMARY KEY,
  hash_uc INTEGER REFERENCES unidade_curricular(hash),
  alias VARCHAR(300) NOT NULL
);


CREATE TABLE sala(
  id_sala SERIAL PRIMARY KEY,
  nome_original TEXT NOT NULL UNIQUE,
  nome_display TEXT NOT NULL,
  numero INT,
  andar INT,
  campus TEXT NOT NULL,
  descricao TEXT[],
  capacidade INT,
  id_analise INTEGER REFERENCES analise(id_analise)
);

CREATE TABLE aula(
  hash VARCHAR(200) PRIMARY KEY,
  hash_uc INTEGER REFERENCES unidade_curricular (hash),
  turma TEXT,
  professor TEXT,
  responsavel TEXT,
  monitoria BOOLEAN,
  aula BOOLEAN,
  reposicao BOOLEAN,
  pos BOOLEAN,
  id_analise INTEGER REFERENCES analise(id_analise)
);

CREATE TABLE reserva_sala(
  id_reserva SERIAL PRIMARY KEY,
  texto TEXT NOT NULL,
  duracao INT NOT NULL,
  id_sala INT REFERENCES sala (id_sala),
  datahora TIMESTAMPTZ NOT NULL,
  hash_aula VARCHAR(100) REFERENCES aula (hash),
  id_analise INTEGER REFERENCES analise(id_analise)
);


CREATE OR REPLACE VIEW aula_termo AS
SELECT A.hash,
  CASE
    WHEN DATE_PART('hour', R.datahora AT TIME ZONE 'BRST') > 17 THEN 'N'
    ELSE 'I'
  END AS termo,
  SUBSTRING(A.turma, 1, 1) AS turma
FROM aula A LEFT JOIN
  reserva_sala R ON A.hash = R.hash_aula;

CREATE OR REPLACE VIEW visao_reserva AS
SELECT
  id_reserva,
  id_sala,
  hash_aula,
  datahora,
  ARRAY[TO_CHAR(datahora AT TIME ZONE 'BRST', 'dy'), TO_CHAR(datahora AT TIME ZONE 'BRST', 'HH24:MI')] AS horario,
  TO_CHAR(datahora AT TIME ZONE 'BRST', 'dy') AS dia,
  TO_CHAR(datahora AT TIME ZONE 'BRST', 'HH24:MI') AS inicio,
  TO_CHAR(datahora AT TIME ZONE 'BRST' + MAKE_INTERVAL(0, 0, 0, 0, 0, duracao, 0), 'HH24:MI') AS fim,
  duracao
FROM reserva_sala;



DROP TABLE IF EXISTS historico;
DROP TABLE IF EXISTS atestado;
DROP TABLE IF EXISTS saldo_ru;
DROP TABLE IF EXISTS servico;

CREATE TABLE historico(
  id_historico SERIAL PRIMARY KEY,
  extracao JSONB NOT NULL,
  datahora TIMESTAMPTZ NOT NULL,

  ra_aluno VARCHAR(10) DEFAULT NULL
);

CREATE TABLE atestado(
  id_atestado SERIAL PRIMARY KEY,
  extracao JSONB NOT NULL,
  datahora TIMESTAMPTZ NOT NULL,

  ra_aluno VARCHAR(10) DEFAULT NULL
);

CREATE TABLE saldo_ru(
  id_saldo SERIAL PRIMARY KEY,
  extracao JSONB NOT NULL,
  datahora TIMESTAMPTZ NOT NULL,

  ra_aluno VARCHAR(10) DEFAULT NULL
);

CREATE TABLE servico(
  id_servico SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  ativo BOOLEAN NOT NULL,
  datahora TIMESTAMPTZ NOT NULL,
  ra_aluno VARCHAR(10) DEFAULT NULL
);
  
CREATE TABLE schedule(
  id_schedule SERIAL PRIMARY KEY,
  servico TEXT NOT NULL,
  args TEXT[] NOT NULL,
  datahora TIMESTAMPTZ NOT NULL,
  repetir JSONB DEFAULT '{}',
  id_servico INTEGER DEFAULT NULL
);



CREATE OR REPLACE FUNCTION CONVERT_WEEKDAY(weekday TEXT) RETURNS TEXT AS $$
  BEGIN
    CASE
      WHEN weekday = 'SEG' THEN RETURN 'mon';
      WHEN weekday = 'TER' THEN RETURN 'tue';
      WHEN weekday = 'QUA' THEN RETURN 'wed';
      WHEN weekday = 'QUI' THEN RETURN 'thu';
      WHEN weekday = 'SEX' THEN RETURN 'fri';
      WHEN weekday = 'SAB' THEN RETURN 'sat';
      ELSE RETURN 'sun';
    END CASE;
  END;
$$ LANGUAGE plpgsql;

create function display_weekday(weekday text)
  returns text
language plpgsql
as $$
BEGIN
  CASE
    WHEN weekday = 'SEG'
    THEN RETURN 'Segunda';
    WHEN weekday = 'TER'
    THEN RETURN 'Terça';
    WHEN weekday = 'QUA'
    THEN RETURN 'Quarta';
    WHEN weekday = 'QUI'
    THEN RETURN 'Quinta';
    WHEN weekday = 'SEX'
    THEN RETURN 'Sexta';
    WHEN weekday = 'SAB'
    THEN RETURN 'Sábado';
  ELSE RETURN 'Domingo';
  END CASE;
END;
$$;

create function dow_to_weekday(_day integer)
  returns text
language plpgsql
as $$
BEGIN
  CASE
    WHEN _day = 1
    THEN RETURN 'Segunda';
    WHEN _day = 2
    THEN RETURN 'Terça';
    WHEN _day = 3
    THEN RETURN 'Quarta';
    WHEN _day = 4
    THEN RETURN 'Quinta';
    WHEN _day = 5
    THEN RETURN 'Sexta';
    WHEN _day = 6
    THEN RETURN 'Sábado';
  ELSE RETURN 'Domingo';
  END CASE;
END;
$$;


create function parse_int_weekday(weekday text)
  returns integer
language plpgsql
as $$
BEGIN
    CASE
      WHEN weekday = 'SEG' THEN RETURN 1;
      WHEN weekday = 'TER' THEN RETURN 2;
      WHEN weekday = 'QUA' THEN RETURN 3;
      WHEN weekday = 'QUI' THEN RETURN 4;
      WHEN weekday = 'SEX' THEN RETURN 5;
      WHEN weekday = 'SAB' THEN RETURN 6;
      ELSE RETURN 7;
    END CASE;
  END;
$$;


