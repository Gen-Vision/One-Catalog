import { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../services/productApi';
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

export default function Mockup() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(localStorage.getItem('mockupImage'));
  const navigate = useNavigate();
  const { userId, productId } = useParams<{ userId: string; productId: string }>();

  useEffect(() => {
    productApi.getProduct(
      productId!,
      (data: any) => {
        const product = data.product;
        setUploadedImages(product.uploadedImages);
      },
      (error: any) => {
        toast.error('Error fetching product data');
        console.error('Error fetching product data:', error);
      }
    );
  }, [productId]);

  const handleImageClick = (imageSrc: string) => {
    if (selectedImage === imageSrc) {
      setSelectedImage(null);
      localStorage.removeItem('mockupImage');
    } else {
      setSelectedImage(imageSrc);
      localStorage.setItem('mockupImage', imageSrc);
    }
  };

  const getGridTemplateColumns = (numberOfColumns: number) => {
    return `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  };

  const handleClearButtonClick = () => {
    setSelectedImage(null);
    localStorage.removeItem('mockupImage');
  };

  const handleNextButtonClick = () => {
    navigate(`/genvision/${userId}/${productId}/mockup/2`);
  };

  return (
    <div className="flex">
      <div className="w-1/2 border-[#D4D4D4] flex flex-col">
        <div className="bg-white my-5 rounded-b-lg flex-grow flex flex-col">
          <h1 className="text-[#000000] mx-1 my-1 text-base font-semibold">
            Select one image to create mockup
          </h1>
          <div className="flex-grow flex flex-col">
            <div
              className="grid gap-4 w-full border p-5 rounded-md border-[#623FC4] flex-grow"
              style={{
                gridTemplateColumns: getGridTemplateColumns(3),
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
            <div className="flex gap-4 my-4">
              <button
                className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-violet-600"
                onClick={handleClearButtonClick}
              >
                Clear
              </button>
              <button
                className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white"
                onClick={handleNextButtonClick}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2 bg-white p-8">
        <div
          className="grid gap-4 w-full h-[350px] border rounded-md border-[#623FC4]"
          style={{
            gridTemplateColumns: getGridTemplateColumns(4),
          }}
        >
        </div>
      </div>
    </div>
  );
}
