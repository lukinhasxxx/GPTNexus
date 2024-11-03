const client = require('./config');

async function createTable(options) {
    try {
        await client.connect(options);
        await client.query(`
      CREATE TABLE IF NOT EXISTS lonpm i gs (
        cod_id SERIAL PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        operation VARCHAR(50),
        prompt TEXT,
        response TEXT
      );
    `);
        console.log('Tabela "logs" criada ou já existe.');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    } finally {
        await client.end();
    }
}

createTable();