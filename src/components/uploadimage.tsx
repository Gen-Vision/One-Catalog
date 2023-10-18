import { useState, FormEvent } from 'react';
import UploadButton from './uploadbtn';
import { amazon, flipkart } from '@/assets/logo';
import { Switch } from './ui/switch';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productId, setProductId] = useState('');
  const [category, setCategory] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageChange = (imageFile: File) => {
    setSelectedImage(imageFile);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create an object with product id, category, and image URL
    const productData = {
      id: productId,
      category,
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : '',
    };

    console.log('Product Data:', productData);

    // Add the image URL to the uploadedImages state
    if (productData.imageUrl) {
      setUploadedImages([...uploadedImages, productData.imageUrl]);
    }

    // Reset form fields and the selected image
    setProductId('');
    setCategory('');
    setSelectedImage(null);
  };

  return (
    <div className="flex-1 bg-black mx-7 my-7 flex">
      <div className="w-1/3 bg-white border-[#D4D4D4]">
        <div className="h-[350px] bg-white p-4 rounded-b-lg">
          <h1 className="font-bold text-[#000000] mx-2 text-xl">
            Add New Product
          </h1>
          <div className="mt-4 mx-2">
            <div className="mx-0">
              <UploadButton onImageChange={handleImageChange} />
            </div>
            <form className="mt-4" action="" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="productId"
                  className="block font-bold text-[#000000]"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  placeholder="Product Id Required."
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={productId}
                  onChange={e => setProductId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block font-bold text-[#000000]"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Category Required."
                  className="border border-grey-300 shadow p-1 w-full rounded"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </div>
              <div className="flex  gap-4 items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={amazon}
                    alt="Toggle 1"
                    className="w-7 h-7 mr-2 border rounded-xl"
                  />
                  <Switch name="amazon" />
                </div>
                <div className="flex item">
                  <img
                    src={flipkart}
                    alt="Toggle 2"
                    className="w-7 h-7 mr-2 border rounded-xl "
                  />
                  <Switch name="flipkart" />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-medium  rounded-md cursor-pointer border border-violet-600">
                  Cancel
                </button>

                <button className="bg-[#623FC4] w-1/2 items-center justify-center font-medium  rounded-md cursor-pointer text-white">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-white p-8">
        <div className="grid grid-cols-4  gap-4 w-full border h-[350px] rounded-md border-[#623FC4]">
          {uploadedImages.map((imageSrc, index) => (
            <div key={index} className="flex w-[200px] h-[200px]">
              <img src={imageSrc} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
