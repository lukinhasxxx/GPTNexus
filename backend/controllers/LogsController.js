const pool = require('../database/config');


async function getLogs(req, res) {
    try {
        const result = await pool.query('SELECT * FROM logs ORDER BY date DESC');

        //formata a resposta com uma chave "logs" para a lista de registros
        const response = {
            count: result.rowCount,
            logs: result.rows.map(row => ({
                cod_id: row.cod_id,
                date: row.date,
                operation: row.operation,
                prompt: row.prompt,
                response: row.response,
            }))
        };

        res.json(response);
    } catch (error) {
        console.error('Erro ao buscar logs:', error);
        res.status(500).json({ error: 'Erro ao buscar logs no banco de dados' });
    }
}

module.exports = { getLogs };
