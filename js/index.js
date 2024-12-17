const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware do parsowania JSON
app.use(bodyParser.json());

// Trasa do weryfikacji Turnstile
app.post('/verify-captcha', async (req, res) => {
  const { token } = req.body;
  
  try {
    const verificationResponse = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      secret: 'TWOJ_PRYWATNY_KLUCZ',
      response: token
    });

    if (verificationResponse.data.success) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Błąd weryfikacji' });
  }
});
