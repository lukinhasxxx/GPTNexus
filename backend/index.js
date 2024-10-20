const express = require('express');
const app = express();

const helloRoutes = require('./routes/helloRoutes');
app.use('/', helloRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
