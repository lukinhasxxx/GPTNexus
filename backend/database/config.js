const { Pool } = require('pg');

// Configuração do Pool
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'seu_banco',
    user: 'seu_usuario',
    password: 'sua_senha',
    ssl: { rejectUnauthorized: false },
});

module.exports = pool;
