import { Separator } from '@/components/ui/separator';
import InfoBox from './reusableInfobox';
import Feature from './reusableFeatures';
import { useEffect, useRef, useState } from 'react';
// import { convertStoredImageToFile } from '@/lib/utils';
import removeBackground from '@/api/removeBackground';
// import response from "./src/assets/images/response.png"
import responseImage from '../assets/images/response.png';
import imageUpscale from '@/api/imageUpscale';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProductData {
  id: string;
  category: string;
  uploadedImages: string[];
  brand?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  expiryDate?: string;
}

export default function EditImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  // const [generateButtonPressed, setGenerateButtonPressed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [expectedWidth, setExpectedWidth] = useState<number>(10);
  const [expectedHeight, setExpectedHeight] = useState<number>(10);
  const [editedImage, setEditedImage] = useState<string>();
  const [editedImageStatus, setEditedImageStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelect = (title: string) => {
    setSelectedOption(title);
    console.log(title);
  }

  // Assume product is an array of ProductData objects
  const {productId} = useParams();
  const product: ProductData = JSON.parse(localStorage.getItem('product') || '[]').find((p: ProductData) => p.id === productId);


  // Flatten all uploadedImages arrays into a single array
  // useEffect(() => {
  //   const processImage = async () => {
  //     if (generateButtonPressed) {
  //       console.log("YES");
        
  //       // Call API and replace uploaded images
  //       if (selectedImage === null) {
  //         toast.error('Please select a picture and generate again');
  //       } else {
  //         // let editedImage: string | null = null;
  
  //         // Check if removeBackground is in selectedFeatures
  //         if (selectedFeatures.includes('removeBackground')) {
  //           try {
  //             console.log("REmove bg");
              
  //             const removeBgResponse = await removeBackground(selectedImage);
  //             // Use the response as the edited image
  //             setEditedImage(URL.createObjectURL(removeBgResponse));
  //           } catch (error) {
  //             console.error('Error removing background:', error);
  //             // Handle error
  //           }
  //         }
  
  //         // Check if upscale is in selectedFeatures
  //         if (selectedFeatures.includes('upscale') && editedImage) {
  //           try {
  //             // Assuming upscale is an asynchronous function
  //             const upscaleResponse = await imageUpscale(editedImage, expectedWidth, expectedHeight);
  //             // Use the response as the edited image
  //             setEditedImage(URL.createObjectURL(upscaleResponse));
  //           } catch (error) {
  //             console.error('Error upscaling image:', error);
  //             // Handle error
  //           }
  //         }
  
  //         // Set the edited image in state
  //         // if (editedImage) {
  //         //   setEditedImage(editedImage);
  //         //   setUploadedImages([editedImage]);
  //         // }
  //       }
  //       setEditedImage(responseImage);
  //     } else {
  //       if (product) {
  //         const allImages: string[] = product.uploadedImages;
  //         setUploadedImages(allImages);
  //       }
  //     }
  //   };
  //   processImage();
  // }, [generateButtonPressed]);

  useEffect(() => {
    
    if (product) {
      const allImages: string[] = product.uploadedImages;
      setUploadedImages(allImages);
    }
  },[])
  
    
  const handleImageClick = (imageSrc: string) => {
    // Toggle the selection state
    // console.log(imageSrc);

    if (selectedImage === imageSrc) setSelectedImage(null);
    else setSelectedImage(imageSrc);
    // console.log(selectedImage);
  };

  const getGridTemplateColumns = (numberOfColumns: number) => {
    return `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  };

  // const handleGenerateButtonClick = () => {
  //   // Set the button pressed state to trigger the effect
  //   // console.log("pressed");
  //   // if(generateButtonPressed===true) console.log("Yes");
    
  //   setGenerateButtonPressed(true);
  // };

  const handleGenerateButtonClick = async () => {
    
    try {
      if (!selectedImage) {
        toast.error('Please select a picture and generate again');
        return;
      }
      if(!selectedFeatures) {
        toast.error('Please select a feature and generate again');
        return;
      }
  
      let processedImage = selectedImage;
  
      // Check if removeBackground is in selectedFeatures
      if (selectedFeatures.includes('Remove Background')) {
        try {
          const removeBgResponse = await removeBackground(selectedImage);
          // Use the response as the processed image\
          processedImage = URL.createObjectURL(removeBgResponse);
        } catch (error) {
          console.error('Error removing background:', error);
          // Handle error
          return;
        }
      }
  
      // Check if upscale is in selectedFeatures
      if (selectedFeatures.includes('upscale')) {
        try {
          const upscaleResponse = await imageUpscale(processedImage, expectedWidth, expectedHeight);
          // Use the response as the processed image
          processedImage = URL.createObjectURL(upscaleResponse);
        } catch (error) {
          console.error('Error upscaling image:', error);
          // Handle error
          return;
        }
      }
  
      // Set the processed image in state
      setEditedImage(processedImage);
    } catch (error) {
      console.error('Error processing image:', error);
      // Handle error
    }
    setEditedImageStatus(true);

  };

  const handleSaveButton = () => {
    // First, update the uploadedImages state
    setUploadedImages((prevUploadedImages) => {
      const updatedImages = [...prevUploadedImages, editedImage!];
  
      // Create the updated product with the new images
      const updatedProduct = { ...product, uploadedImages: updatedImages };
  
      // Update localStorage with the new product data
      const products: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');
      const existingProductIndex = products.findIndex(p => p.id === productId);
      products[existingProductIndex] = updatedProduct;
      localStorage.setItem('product', JSON.stringify(products));
  
      console.log(updatedImages);
      return updatedImages;
    });
  
    setEditedImageStatus(false);
  };
  
  

  const handleFeatureSelect = (feature: string, selected: boolean) => {
    setSelectedFeatures(prevSelectedFeatures => {
      // console.log(selectedFeatures);
      if (selected) {
        // Add to selected features array
        if (feature === 'Upscale') setModalOpen(true);
        return [...prevSelectedFeatures, feature];
      } else {
        // Remove from selected features array
        if (feature === 'Upscale') {
          setExpectedWidth(0);
          setExpectedHeight(0);
          setModalOpen(false);
        }
        return prevSelectedFeatures.filter(item => item !== feature);
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
          onSelect={selected =>
            handleFeatureSelect('Remove Background', selected)
          }
        />
        <Feature
          title="Upscale"
          description="Upscale image up to 4X"
          onSelect={selected => handleFeatureSelect('Upscale', selected)}
        />

        {/* Modal */}
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>
                <b>Enter Expected Dimensions</b>
              </h2>
              <label>
                Width:
                <input
                  type="number"
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={expectedWidth || ''}
                  onChange={e => setExpectedWidth(Number(e.target.value))}
                />
              </label>
              <label>
                Height:
                <input
                  type="number"
                  className="border border-gray-300 shadow p-1 w-full rounded mb-2"
                  value={expectedHeight || ''}
                  onChange={e => setExpectedHeight(Number(e.target.value))}
                />
              </label>
              <button
                className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <Feature
          title="Auto Enhance"
          description="Enhance image with AI"
          onSelect={selected => handleFeatureSelect('Auto Enhance', selected)}
        />

        
      <div>
        <br />
        <InfoBox
          title="Magic Inpainting"
          description="Re-usable components built using Radix UI and Tailwind CSS"
          isSelected={selectedOption === 'Magic Inpainting'}
          handleSelect={handleSelect}
        />
        <br />
        <InfoBox
          title="Effects & Adjust"
          description="Re-usable components built using Radix UI and Tailwind CSS"
          isSelected={selectedOption === 'Effects & Adjust'}
          handleSelect={handleSelect}
        />
        <br />
      </div>

        <div className="flex gap-4 mt-1">
          <button
            className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-violet-600"
            disabled
          >
            Next
          </button>

          <button
            className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white"
            onClick={handleGenerateButtonClick}
          >
            Generate
          </button>
        </div>
      </div>

      <Separator orientation="vertical" className="" />

          {
            editedImageStatus?
            <><div className="w-1/2 bg-white m-10 p-4 border border-violet-500">
            <div className="flex justify-between mb-4">
              <button className="bg-[#623FC4] p-2 font-semibold rounded-md cursor-pointer text-white" onClick={handleSaveButton}>Save</button>
              </div>
            <div className="flex justify-center items-center">
              <img
                src={editedImage!}
                alt="abc"
                className="max-w-full max-h-[60vh] object-cover cursor-pointer"
              />
            </div>
          </div>
          
            </>
            :
            <div className="w-2/3 bg-white p-8">
              <div className="grid grid-cols-3 gap-4 border p-5 rounded-md border-[#623FC4]"
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
          }
    </div>
  );
}
