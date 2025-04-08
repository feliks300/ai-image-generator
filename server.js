require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Генерация изображений
app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        if (!response.ok) throw new Error('Ошибка генерации');
        
        const imageBuffer = await response.arrayBuffer();
        res.set('Content-Type', 'image/png');
        res.send(Buffer.from(imageBuffer));
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
