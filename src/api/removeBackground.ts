// api/removeBackground.ts
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import fetchClipdropKey from './fetchClipdropKey';
// import { createReadStream } from 'fs';

const removeBackground = async (imageFileUrl: string) => {
  try {
    console.log('here');
    const data = new FormData();
    
    data.append('image_file', await fetch(imageFileUrl).then((res) => res.blob()));
    const apiKey = await fetchClipdropKey();
    
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://clipdrop-api.co/remove-background/v1',
      headers: {
        'x-api-key': apiKey,
      },
      data: data,
      responseType: 'blob'
    };

    const response = await axios(config);
    // console.log(response);
    
    return response.data;
  } catch (error) {
    console.error('Error in removeBackground API call:', error);
    throw error;
  }
};

export default removeBackground;
