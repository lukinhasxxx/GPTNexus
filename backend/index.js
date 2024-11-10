const express = require('express');
const app = express();

app.use(express.json());

const helloRoutes = require('./routes/helloRoutes');
const geminaiRoutes = require('./routes/geminaiRoutes');
const logsRoutes = require('./routes/logsRoutes');
// Rotas
app.use('/api', geminaiRoutes);
app.use('/api', logsRoutes);
app.use('/', helloRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
