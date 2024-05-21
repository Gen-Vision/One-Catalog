// import React from 'react'

// import Feature from './reusableFeatures';
import getChatGPTResponse from '@/api/chatGPTResponse';
import { Separator } from './ui/separator';
import { useState } from 'react';
import template1  from '../assets/images/template1.png';
import template2 from '../assets/images/template2.png';
import Text2_Template1 from './text2_template1';
import Text2_Template2 from './text2_template2';


export default function Text2() {

  const [prompt, setPrompt] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateClick = (template: string) => {
    setSelectedTemplate(template);
    console.log(template);
    
  };
  
  
  const handleGenerateClick = async () => {
  try {
    console.log("clicked2");
    setDescription("Please wait..Loading!!!!!!")
    const p2 = `Provide detailed information about the features of the product, including specifications, functionalities, unique selling points, and any notable advantages. Please list at least four key features that distinguish this product. Since I need to integrate it with my website give it as json with heading and description. Thank you!" The priduct is ${prompt}`;
    const response = await getChatGPTResponse(p2);
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
    <div className="flex ">
      <div className="w-1/3 flex flex-col  h-full border-[#D4D4D4] rounded-b-lg mt-4 ">
        {/* <h1 className="text-[#000000] mb-5 text-base font-semibold">
          Describe about the product
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
        <Separator /> */}

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
                className={`w-48 h-48 ${selectedTemplate === 'template2' ? 'border-2 bg-purple-500' : ''}`}
                onClick={() => handleTemplateClick('template2')}
              />
           </div>
            <br />
        </div>
        <div className="flex gap-4 mt-1 bottom-0">
          <button
            className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-[#623FC4]"
            disabled
          >
            Next
          </button>
          <button className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white" onClick={handleGenerateClick}>
            Generate
          </button>
        </div>
      </div>
      <Separator orientation="vertical" className="" />
      <div className="w-2/3 bg-white p-8">
        <div className="w-full h-[500px] rounded-md border border-[#623FC4] p-4 overflow-auto">
          {
            selectedTemplate?
            selectedTemplate === 'template1'?
            <Text2_Template1 />:<Text2_Template2 />
            :
            <></>
          }
        </div>
      </div>
    </div>
    // <div>Hi</div>
  );
}
