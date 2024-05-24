// src/components/Dashboard.tsx
import { useState, FormEvent } from 'react';
import UploadButton from './uploadbtn';
import InputWithSpeech from './ui/inputWithSpeech';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar2';
import { productApi } from '../services/productApi';

interface ProductData {
  productId: string;
  category: string;
  uploadedImages: string[];
  brand?: string | undefined;
  productName?: string | undefined;
  quantity?: number | undefined;
  price?: number | undefined;
  expiryDate?: string | undefined;
  manufacturingDate?: string | undefined;
}

const UploadImage = () => {
  const [productId, setProductId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [productName, setProductName] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState<string | undefined>(undefined);
  const [manufacturingDate, setManufacturingDate] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleImageChange = (imageFile: File) => {
    setUploadedImages([...uploadedImages, URL.createObjectURL(imageFile)]);
  };

  const handleCancelButton = () => {
    navigate(`/genvision/${userId}`);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData: ProductData = {
      productId,
      category,
      uploadedImages,
      brand,
      productName,
      quantity,
      price,
      expiryDate,
      manufacturingDate,
    };

    productApi.createProduct(
      productData,
      (data:any) => {
        // Handle success (e.g., show success message, navigate to another page)
        console.log('Product created successfully:', data);
        setProductId('');
        setCategory('');
        setBrand('');
        setProductName('');
        setPrice(undefined);
        setQuantity(undefined);
        setExpiryDate('');
        setUploadedImages([]);
        setManufacturingDate('');
        navigate(`/genvision/${userId}`);
      },
      (error:any) => {
        // Handle error (e.g., show error message)
        console.error('Error creating product:', error);
      }
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex-1 bg-black mx-7 my-7 flex">
        <div className="w-1/3 bg-white border-[#D4D4D4]">
          <div className="h-[350px] bg-white p-4 rounded-b-lg">
            <h1 className="font-bold text-[#000000] mx-2 text-xl">Add New Product</h1>
            <div className="mt-4 mx-2">
              <div className="mx-0">
                <UploadButton onImageChange={handleImageChange} />
              </div>
              <form className="mt-4" action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Brand Name"
                    label="Brand"
                    inputValue={brand}
                    setInput={setBrand}
                    name="brand"
                    disabled={false}
                  />
                </div>
                <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Product Name"
                    label="Product"
                    inputValue={productName}
                    setInput={setProductName}
                    name="productName"
                    disabled={false}
                  />
                </div>
                {/* <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Product Id Required."
                    label="Product ID"
                    inputValue={productId}
                    setInput={setProductId}
                    name="productId"
                    disabled={false}
                  />
                </div> */}
                <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Category Required."
                    label="Category"
                    inputValue={category}
                    setInput={setCategory}
                    name="category"
                    disabled={false}
                  />
                </div>
                <div className="mb-4 flex">
                  <div className="mr-2 flex-1">
                    <label htmlFor="quantity" className="block font-bold text-[#000000]">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="Quantity Required."
                      className="border border-grey-300 shadow p-1 w-full rounded"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="mr-2 flex-1">
                    <label htmlFor="price" className="block font-bold text-[#000000]">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price Required."
                      className="border border-grey-300 shadow p-1 w-full rounded"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="manufacturingDate" className="block font-bold text-[#000000]">
                    Manufacturing Date
                  </label>
                  <input
                    type="date"
                    id="manufacturingDate"
                    name="manufacturingDate"
                    placeholder="Manufacturing Date Required."
                    className="border border-gray-300 shadow p-1 w-full rounded"
                    value={manufacturingDate}
                    onChange={(e) => setManufacturingDate(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="expiryDate" className="block font-bold text-[#000000]">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="Expiry Date Required."
                    className="border border-gray-300 shadow p-1 w-full rounded"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCancelButton}
                    className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-medium rounded-md cursor-pointer border border-violet-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#623FC4] w-1/2 items-center justify-center font-medium rounded-md cursor-pointer text-white"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-2/3 bg-white p-8">
          <div className="grid grid-cols-3 gap-4 border p-5 rounded-md border-[#623FC4]">
            {uploadedImages.map((imageSrc, index) => (
              <div key={index} className="flex w-[200px] h-[200px]">
                <img src={imageSrc} alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
