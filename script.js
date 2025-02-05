const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI API Key (इसे .env फाइल में रखें)
const OPENAI_API_KEY = 'AIzaSyBsyzQ6CyhvAKFXMUlDaNtSNrwBe6BVC8M
';

// API Endpoint
app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required!' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt,
                n: 1,
                size: '1024x1024'
            })
        });

        const data = await response.json();

        if (response.ok) {
            const imageUrl = data.data[0].url;
            res.json({ imageUrl });
        } else {
            res.status(500).json({ error: data.error.message });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate image. Please try again.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});