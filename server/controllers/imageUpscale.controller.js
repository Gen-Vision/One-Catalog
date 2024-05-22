const axios = require('axios');
const FormData = require('form-data');

const imageUpscale = async (req, res) => {
  const { imageFileUrl, targetWidth, targetHeight } = req.body;
  try {
    const data = new FormData();
    const response = await axios.get(imageFileUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    data.append('image_file', buffer, 'image.png');
    data.append('target_width', targetWidth.toString());
    data.append('target_height', targetHeight.toString());

    const apiKey = process.env.CLIPDROP_API_KEY;

    const config = {
      method: 'post',
      url: 'https://clipdrop-api.co/image-upscaling/v1',
      headers: {
        'x-api-key': apiKey,
        ...data.getHeaders(),
      },
      data: data,
    };

    const result = await axios(config);
    res.json(result.data);
  } catch (error) {
    console.error('Error in imageUpscale API call:', error);
    res.status(500).send('Error upscaling image');
  }
};

module.exports = { imageUpscale };
