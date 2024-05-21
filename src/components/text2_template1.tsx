import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import template1 from '../assets/images/mockup_template1.png';

interface ImageData {
  src: string;
  heading: string;
  description: string;
}

const ImageWithDescription: React.FC<{ data: ImageData; reverse?: boolean }> = ({ data, reverse }) => {
  return (
    <div className={`flex my-4 ${reverse ? 'flex-row-reverse' : ''}`}>
      <div className="w-1/2 flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-2">{data.heading}</h2>
        <p>{data.description}</p>
      </div>
      <div className="w-1/2">
        <img src={data.src} alt={data.heading} className="w-full" />
      </div>
    </div>
  );
};

const Text2_Template1: React.FC = () => {
  const images: ImageData[] = [
    {
      src: `${template1}`,
      heading: 'Image 1 Heading',
      description: 'Description for Image 1',
    },
    {
      src: `${template1}`,
      heading: 'Image 2 Heading',
      description: 'Description for Image 2',
    },
    {
      src: `${template1}`,
      heading: 'Image 3 Heading',
      description: 'Description for Image 3',
    },
    {
      src: `${template1}`,
      heading: 'Image 4 Heading',
      description: 'Description for Image 4',
    },
  ];

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (templateRef.current) {
      const dataUrl = await toPng(templateRef.current);
      setDownloadUrl(dataUrl);
      // Trigger download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'template.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
    <div>
      <button className="bg-[#623FC4] p-2 font-semibold rounded-md cursor-pointer text-white" onClick={handleDownload}>Download</button>
    </div>
      <div ref={templateRef}>
        {images.map((image, index) => (
          <ImageWithDescription key={index} data={image} reverse={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default Text2_Template1;
