import { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import getChatGPTResponse from '@/api/chatGPTResponse';
import template1  from '../assets/images/mockup_template1.png';
import template2 from '../assets/images/mockup_template2.png';
import template3 from '../assets/images/mockup_template3.png';

interface ProductData {
  id: string;
  category: string;
  uploadedImages: string[];
  brand?: string | undefined;
  productName?: string | undefined;
  quantity?: number | undefined;
  price?: number | undefined;
  expiryDate?: string | undefined;
}

export default function Mockup2() {
  const {productId} = useParams();
  const navigate = useNavigate();
  const mockupImage = localStorage.getItem('mockupImage');
  const [prompt, setPrompt] = useState<string>("");
  const [description,setDescription] = useState<string>("");  
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateClick = (template: string) => {
    setSelectedTemplate(template);
    console.log(template);
    
  };
  

  useEffect(() => {
      
  }, []);


  const handleBackButtonClick = () => {
    navigate(`/genvision/:userId/${productId}/mockup/1`);
  }

  const handleGenerateClick = async () => {
    try {
      console.log("clicked");
      setDescription("Please wait..Loading!!!!!!")
      setPrompt(`Generate a digital catalog for my shop that includes detailed information about each item, such as product names, descriptions, prices, and any special offers. The catalog should be visually appealing and easy to share with customers. Ensure that the information is accurate and up-to-date. Thank you! in 400 words  ${prompt}`);
      const response = await getChatGPTResponse(prompt);
      // console.log('Generated Response:', response);
      setDescription(response);
  
      // Handle the response as needed (e.g., update state in a React component)
      // For example, using React state:
      // setGeneratedResponse(response);
    } catch (error) {
      console.error('Error generating response:', error);
      // Handle errors as needed
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 border-[#D4D4D4] flex flex-col">
        <div className="bg-white my-5 rounded-b-lg flex-grow flex flex-col">
        <h1 className="text-[#000000] mb-5 text-base font-semibold">
          Describe about background
        </h1>
        <div className="mb-9">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          ></label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400 sm:text-sm"
            placeholder="Type your message here"
            onChange={(e:any)=>{
              setPrompt(e.target.value)
            }}
          />
        </div>
        <Separator />
        <div>
          <h1 className="text-[#000000] mt-9 text-base font-semibold">
            Templates
          </h1>
            <br />
            <div className="flex">
              <img
                src={template1}
                alt="Template 1"
                className={`w-48 h-48 mr-10 ${selectedTemplate === 'template1' ? 'border-2 bg-purple-500' : ''}`}
                onClick={() => handleTemplateClick('template1')}
              />
              <img
                src={template2}
                alt="Template 2"
                className={`w-48 h-48 mr-10 ${selectedTemplate === 'template2' ? 'border-2 bg-purple-500' : ''}`}
                onClick={() => handleTemplateClick('template2')}
              />
              <img
                src={template3}
                alt="Template 3"
                className={`w-48 h-48 ${selectedTemplate === 'template2' ? 'border-2 bg-purple-500' : ''}`}
                onClick={() => handleTemplateClick('template2')}
              />
           </div>
            <br />
        </div>
          <div className="flex-grow flex flex-col">
        
            <div className="flex gap-4 my-4">
              <button
                className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-violet-600"
                onClick={handleBackButtonClick}
              >
                Back
              </button>
              <button
                className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white"
                onClick={handleGenerateClick}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2 bg-white m-10 p-4 flex justify-center items-center border border-violet-500">
        <img
            src={mockupImage!}
            alt="abc"
            className="max-w-full max-h-[60vh] object-cover cursor-pointer"
        />
       </div>
    </div>
  );
}
