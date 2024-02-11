import axios, { AxiosRequestConfig } from 'axios';

type ChatGPTResponse = {
  choices: { message: { content: string } }[];
};

const getChatGPTResponse = async (prompt: string): Promise<string> => {
  const apiKey = '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'; // Replace with your actual OpenAI API key

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  };

  prompt = `Generate a digital catalog for my shop that includes detailed information about each item, such as product names, descriptions, prices, and any special offers. The catalog should be visually appealing and easy to share with customers. Ensure that the information is accurate and up-to-date. Thank you! in 400 words  ${prompt}`

  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(config);

    const responseData: ChatGPTResponse = response.data;
    const responseText = responseData.choices[0]?.message.content || '';

    return responseText.trim();
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw error;
  }
};

export default getChatGPTResponse;