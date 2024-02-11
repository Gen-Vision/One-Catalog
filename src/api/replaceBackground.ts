// api/replaceBackground.ts
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { createReadStream } from 'fs';

const replaceBackground = async (imageFilePath: string, prompt: string) => {
  try {
    const data = new FormData();
    data.append('image_file', createReadStream(imageFilePath));
    data.append('prompt', prompt);
    const apiKey = process.env.REACT_APP_CLIP_DROP_API_KEY;

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://clipdrop-api.co/replace-background/v1',
      headers: {
        'x-api-key': apiKey,
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error in replaceBackground API call:', error);
    throw error;
  }
};

export default replaceBackground;
