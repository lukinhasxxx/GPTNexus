const pool = require('../database/config');


async function getLogs(req, res) {
    try {
        const result = await pool.query('SELECT * FROM logs ORDER BY date DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar logs:', error);
        res.status(500).json({ error: 'Erro ao buscar logs' });
    }
}

module.exports = { getLogs };
