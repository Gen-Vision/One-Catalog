import { Separator } from '@/components/ui/separator';
import InfoBox from './reusableInfobox';
import Feature from './reusableFeatures';
import { useEffect, useRef, useState } from 'react';
import { convertStoredImageToFile } from '@/lib/utils';
import removeBackground from '@/api/removeBackground';


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

export default function EditImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  let [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [generateButtonPressed, setGenerateButtonPressed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [expectedWidth, setExpectedWidth] = useState<number>();
  const [expectedHeight, setExpectedHeight] = useState<number>();
  const [editedImage, setEditedImage] = useState<string>();

  // Assume product is an array of ProductData objects
  const product: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');

    // Flatten all uploadedImages arrays into a single array
    useEffect(() => {
      if (generateButtonPressed) {
        // Call API and replace uploaded images
        if(selectedImage===null) alert("Please select a picture and generate again");
        else{
          setEditedImage(selectedImage);
          console.log(selectedImage);
          removeBackground(selectedImage).then((data) => {uploadedImages = [URL.createObjectURL(data)];});
          console.log(uploadedImages);
          setUploadedImages(uploadedImages);
          
        }
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
    // console.log(imageSrc);
    
    if(selectedImage===imageSrc) setSelectedImage(null);
    else setSelectedImage(imageSrc);
    // console.log(selectedImage);
    
  };

  const getGridTemplateColumns = (numberOfColumns: number) => {
    return `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  };

  
  const handleGenerateButtonClick = () => {
    // Set the button pressed state to trigger the effect
    setGenerateButtonPressed(true);
  };

  const handleFeatureSelect = (feature: string, selected: boolean) => {
    setSelectedFeatures((prevSelectedFeatures) => {
      // console.log(selectedFeatures);
      if (selected) {
        // Add to selected features array
        if(feature==='Upscale') setModalOpen(true);
        return [...prevSelectedFeatures, feature];
      } else {
        // Remove from selected features array
        if(feature==='Upscale'){
          setExpectedWidth(0);
          setExpectedHeight(0);
        }
        return prevSelectedFeatures.filter((item) => item !== feature);
      }
      
    });
  };

  
  const handleModalSubmit = () => {
    // Process the expected width and height
    // For now, just log them to the console
    console.log('Expected Width:', expectedWidth);
    console.log('Expected Height:', expectedHeight);

    // Close the modal
    setModalOpen(false);
  };

  return (
    <div className="flex" ref={containerRef}>
      <div className="w-1/3  border-[#D4D4D4] rounded-b-lg mt-4">
        <h1 className="text-[#000000] mb-5 text-base font-semibold">
          Select images to edit
        </h1>
        <Feature
          title="Remove Background"
          description="Remove the background of the image"
          onSelect={(selected) => handleFeatureSelect('Remove Background', selected)}
        />
        <Feature 
          title="Upscale" 
          description="Upscale image up to 4X"
          onSelect={(selected) => handleFeatureSelect('Upscale', selected)}
          />

          
      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2><b>Enter Expected Dimensions</b></h2>
            <label>
              Width:
              <input
                type="number"
                className="border border-gray-300 shadow p-1 w-full rounded"
                value={expectedWidth || ''}
                onChange={(e) => setExpectedWidth(Number(e.target.value))}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                className="border border-gray-300 shadow p-1 w-full rounded mb-2"
                value={expectedHeight || ''}
                onChange={(e) => setExpectedHeight(Number(e.target.value))}
              />
            </label>
            <button  className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white" onClick={handleModalSubmit}>Submit</button>
          </div>
        </div>
      )}

        <Feature 
          title="Auto Enhance" 
          description="Enhance image with AI" 
        onSelect={(selected) => handleFeatureSelect('Auto Enhance', selected)}
          />

        <InfoBox
          title="Magic Inpainting"
          description="Re-usable components built using Radix UI and Tailwind CSS"
        />
        <InfoBox
          title="Magic Inpainting"
          description="Re-usable components built using Radix UI and Tailwind CSS"
        />
        <InfoBox
          title="Effects & Adjust"
          description="Re-usable components built using Radix UI and Tailwind CSS"
        />

        <div className="flex gap-4 mt-1">
          <button
            className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-violet-600"
            disabled
          >
            Next
          </button>

          <button className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white" onClick={handleGenerateButtonClick}>
            Generate
          </button>
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
