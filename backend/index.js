const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const helloRoutes = require('./routes/helloRoutes');
const geminaiRoutes = require('./routes/geminaiRoutes');
const logsRoutes = require('./routes/logsRoutes');
// Rotas
app.use('/api', geminaiRoutes);
app.use('/api', logsRoutes);
app.use('/', helloRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
