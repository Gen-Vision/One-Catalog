const express = require('express');
const { imageUpscale } = require('../controllers/imageUpscale.controller');
const { removeBackground } = require('../controllers/removeBackground.controller');

const router = express.Router();

router.get('/clipdrop-key', (req, res) => {
    const apiKey = process.env.CLIPDROP_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not found' });
    }

    // Send the API key to the frontend
    res.json({ apiKey });
});

router.post('/image-upscale', imageUpscale);
router.post('/remove-background', removeBackground);

module.exports = router;