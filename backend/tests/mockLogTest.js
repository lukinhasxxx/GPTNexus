require('dotenv').config();
const axios = require('axios');
const { Pool } = require('pg');
const nock = require('nock');

const pool = new Pool({
    host: 'localhost',
    database: 'projeto_',
    user: 'postgres',
    password: 'admin',
    port: 5432,
});

async function clearLogs() {
    await pool.query('DELETE FROM logs');
}

async function insertMockLog(operation, response) {
    const logQuery = `
        INSERT INTO logs (operation, response, date)
        VALUES ($1, $2, NOW());
    `;
    await pool.query(logQuery, [operation, response]);
}

// Simular uma requisição e testar a inserção de log
async function mockRequest() {
    try {
        const prompt = { prompt: "Qual é a capital da Argentina?" };

        //interrompe a requisicao para um mock
        nock('http://localhost:3000')
            .post('/pergunte-ao-gemini-teste', prompt)
            .reply(200, { completion: "Qual é a capital da Argentina?" });

        const response = await axios.post('http://localhost:3000/pergunte-ao-gemini-teste', prompt);

        console.log('Resposta do Gemini:', response.data);

        // Inserir um log no banco
        await insertMockLog('consultar', JSON.stringify(response.data));
        console.log('Log inserido com sucesso!');

    } catch (error) {
        console.error('Erro ao simular a requisição:', error);
    } finally {
        await pool.end();
    }
}

// Executar os testes
(async () => {
    await mockRequest();
})();
