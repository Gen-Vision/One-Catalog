// api/removeBackground.ts
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
// import { createReadStream } from 'fs';

const removeBackground = async (imageFileUrl: string) => {
  try {
    const data = new FormData();
    
    data.append('image_file', await fetch(imageFileUrl).then((res) => res.blob()));
    const apiKey = "7e7e27842a5d797128dd75c9df10577bccc3c2e26c076fbe23feb73702952877798c45238820a7a98704d258a4f5d647";

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://clipdrop-api.co/remove-background/v1',
      headers: {
        'x-api-key': apiKey,
      },
      data: data,
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
