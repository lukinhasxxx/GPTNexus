const { Client } = require('pg');

const client = new Client({
    host: 'host',
    port: 'port',
    database: 'banco',
    user: 'usuario',
    password: 'senha',
    ssl: { rejectUnauthorized: false },
});

module.exports = client;