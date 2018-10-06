CREATE VIEW compromissos AS
SELECT 'aula' AS tipo, ATu.ra_aluno, UC.nome AS nome, T.nome AS turma, H.dia_semana, NULL as dia, H.hora, HT.sala, NULL as descricao
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
SELECT 'evento' AS tipo, ET.ra_aluno, E.descricao AS nome, T.nome as turma, NULL as dia_semana, ET.data AS dia, ET.hora, ET.sala, ET.descricao
FROM evento_turma AS ET
    INNER JOIN turma AS T
        ON ET.id_turma = T.id_turma
    INNER JOIN evento AS E
        ON ET.id_evento = E.id_evento
ORDER BY hora;