// import React from 'react'

// import Feature from './reusableFeatures';
import getChatGPTResponse from '@/api/chatGPTResponse';
import InfoBox from './reusableInfobox';
import { Separator } from './ui/separator';
import { useState } from 'react';



export default function Text() {

  const [prompt, setPrompt] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  
  const handleGenerateClick = async () => {
  try {
    console.log("clicked");
    setDescription("Please wait..Loading!!!!!!")
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
    <div className="flex ">
      <div className="w-1/3 flex flex-col  h-full border-[#D4D4D4] rounded-b-lg mt-4 ">
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
          <InfoBox
            title="E-commerce"
            description="Create heading, key points & descriptions"
          />
          <InfoBox
            title="Social Media"
            description="Create content for social media post"
          />
          <InfoBox
            title="Advertisement"
            description="Create content optimized for Ad campaigns"
          />
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
        <div className="w-full h-[350px] rounded-md border border-[#623FC4] p-4">{description}</div>
      </div>
    </div>
  );
}
