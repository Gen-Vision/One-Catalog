// api/imageUpscale.ts
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { createReadStream } from 'fs';

const imageUpscale = async (imageFilePath: string, targetWidth: number, targetHeight: number) => {
  try {
    const data = new FormData();
    data.append('image_file', createReadStream(imageFilePath));
    data.append('target_width', targetWidth.toString());
    data.append('target_height', targetHeight.toString());

    const apiKey = process.env.REACT_APP_CLIP_DROP_API_KEY;

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://clipdrop-api.co/image-upscaling/v1',
      headers: {
        'x-api-key': apiKey,
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error in imageUpscale API call:', error);
    throw error;
  }
};

export default imageUpscale;
