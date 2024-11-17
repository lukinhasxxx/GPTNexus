const pool = require('../database/config');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function consultarGeminai(req, res) {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });
    const { prompt } = req.body;

    try {
        if (!prompt || prompt.trim() === "") {
            // Se estiver vazio, retorne um erro com status 400
            return res.status(400).json({
                message: "O campo 'prompt' é obrigatório e não pode estar vazio."
            });
        }
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        await inserirLogNoBanco('consultar', prompt, responseText);
        res.json({ completion: responseText });
    } catch (error) {
        if (error.response) {
            //trata erros da API Gemini
            const statusCode = error.response.status;
            const errorMessage = statusCode === 401
                ? 'Erro de autenticação. Verifique a chave da API.'
                : `Erro ao consultar o serviço externo: Código ${statusCode}`;
            console.error('Erro ao consultar o Gemini:', errorMessage);
            res.status(statusCode).json({ error: errorMessage });
        } else {
            //trata outros erros não relacionados à API Gemini (ex: banco de dados)
            console.error('Erro interno do servidor:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

//função para inserir o log no banco de dados
async function inserirLogNoBanco(operation, prompt, response) {
    const logQuery = `
        INSERT INTO logs (operation, prompt, response, date)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
    `;
    const logValues = [operation, prompt, response];
    try {
        const result = await pool.query(logQuery, logValues);
        console.log('Log inserido com sucesso:', result.rows[0]);
    } catch (error) {
        console.error('Erro ao inserir o log no banco de dados:', error);
        throw new Error('Erro no banco de dados');
    }
}

module.exports = { consultarGeminai };
