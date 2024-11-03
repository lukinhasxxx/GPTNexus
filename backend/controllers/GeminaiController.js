const pool = require('../database/config');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios'); // para fazer requisição ao serviço externo

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function consultarGeminai(req, res) {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });
    const { prompt } = req.body;
    try {
        const result = await model.generateContent(prompt);
        // Inserir um log no banco de dados após receber a resposta
        const logQuery = `
            INSERT INTO logs (operation, response, date)
            VALUES ($1, $2, NOW())
            RETURNING *;
        `;

        const logValues = ['consultarGeminai', await result.response.text()];
        await pool.query(logQuery, logValues);
        //res
        res.json({ completion: result.response.text() });
    } catch (error) {
        console.error('Erro ao consultar o Gemini:', error);
        res.status(500).json({ error: 'Erro ao consultar o serviço externo' });
    }
}

module.exports = { consultarGeminai };
