const axios = require('axios');
const FormData = require('form-data');

const removeBackground = async (req, res) => {
  const { imageFileUrl } = req.body;
  try {
    const data = new FormData();
    const response = await axios.get(imageFileUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    data.append('image_file', buffer, 'image.png');
    const apiKey = process.env.CLIPDROP_API_KEY;

    const config = {
      method: 'post',
      url: 'https://clipdrop-api.co/remove-background/v1',
      headers: {
        'x-api-key': apiKey,
        ...data.getHeaders(),
      },
      data: data,
    };

    const result = await axios(config);
    res.json(result.data);
  } catch (error) {
    console.error('Error in removeBackground API call:', error);
    res.status(500).send('Error removing background');
  }
};

module.exports = { removeBackground };
