import { NavLink } from 'react-router-dom';
import { Separator } from './ui/separator';
import { useEffect, useState } from 'react';



interface ProductData {
  id: string;
  category: string;
  uploadedImages: string;
  brand?: string | undefined;
  productName?: string | undefined;
  quantity?: number | undefined;
  price?: number | undefined;
  expiryDate?: string | undefined;
}

export default function Mockup() {

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generateButtonPressed, setGenerateButtonPressed] = useState(false);

  // Assume product is an array of ProductData objects
    const product: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');

    // Flatten all uploadedImages arrays into a single array
    useEffect(() => {
      if (generateButtonPressed) {
        // Call API and replace uploaded images
        setUploadedImages([]);
      }
      else{
      const allImages = product.reduce<string[]>((images, productItem) => {
        return [...images, ...productItem.uploadedImages];
      }, []);
      setUploadedImages(allImages);
      }
    }, [generateButtonPressed]);

    
  const handleImageClick = (imageSrc: string) => {
    // Toggle the selection state
    console.log(imageSrc);
    
    if(selectedImage===imageSrc) setSelectedImage(null);
    else setSelectedImage(imageSrc);
    console.log(selectedImage);
    
  };

  
  const getGridTemplateColumns = (numberOfColumns: number) => {
    return `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  };

  
  const handleGenerateButtonClick = () => {
    // Set the button pressed state to trigger the effect
    setGenerateButtonPressed(true);
  };

  return (
    <div className=" flex  ">
      <div className="w-1/3 border-[#D4D4D4] ">
        <div className="flex items-center ml-0 gap-x-16 mt-8 px-7">
          {[
            { to: '/mockup/assets', title: 'Assets' },
            { to: '/mockup/prompt', title: 'Prompt' },
          ].map(mockup => (
            <NavLink
              to={mockup.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#623FC4] px-16 py-1  border-b-2 border-[#623FC4]'
                  : 'px-16 py-1'
              }
            >
              <div className="text-Black font-semibold tracking-wide px-2 py-1 ">
                {mockup.title}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="h-[350px] bg-white my-5 rounded-b-lg flex flex-col">
          <h1 className="text-[#000000] mx-1 my-1 text-base font-semibold ">
            Select one image to create mockup
          </h1>
          <div className="flex-grow"></div>

          <div className="flex gap-4 my-8">
            <button
              className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold  rounded-md cursor-pointer border border-violet-600"
              disabled
            >
              Next
            </button>
            <button className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold  rounded-md cursor-pointer text-white" onClick={handleGenerateButtonClick}>
              Generate
            </button>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" className="" />
      
      <div className="w-2/3 bg-white p-8">
      <div
        className="grid gap-4 w-full border h-[350px] rounded-md border-[#623FC4]"
        style={{
          gridTemplateColumns: getGridTemplateColumns(4), // Adjust the number of columns as needed
        }}
      >
        {uploadedImages.map((imageSrc, index) => (
          <div
            key={index}
            className={`relative flex w-[200px] h-[200px] ${
              selectedImage === imageSrc ? 'border-4 border-blue-500' : ''
            }`}
          >
            <img
              src={imageSrc}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(imageSrc)}
              className="w-full h-full object-cover cursor-pointer"
            />
            {selectedImage === imageSrc && (
              <div className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}
