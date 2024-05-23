import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import fetchClipdropKey from './fetchClipdropKey';

const imageUpscale = async (imageFileUrl: string, targetWidth: number, targetHeight: number) => {
  try {
    const data = new FormData();
    data.append('image_file', await fetch(imageFileUrl).then((res) => res.blob()));
    data.append('target_width', targetWidth.toString());
    data.append('target_height', targetHeight.toString());

    // Fetch the API key from backend
    const apiKey = await fetchClipdropKey();

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://clipdrop-api.co/image-upscaling/v1',
      headers: {
        'x-api-key': apiKey,
        ...data.getHeaders(),
      },
      data: data,
      responseType: 'blob'
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error in imageUpscale API call:', error);
    throw error;
  }
};

export default imageUpscale;
