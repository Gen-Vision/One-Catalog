import React, { useState, useEffect, FormEvent } from 'react';
import UploadButton from './uploadbtn';
import InputWithSpeech from './ui/inputWithSpeech';
import { useNavigate, useParams } from 'react-router-dom';

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

const UploadAdditionalImage: React.FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const { userId, productId } = useParams<{ userId: string; productId: string }>();

  useEffect(() => {
    const products: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');
    const product = products.find(p => p.id === productId);
    if (product) {
      setProduct(product);
      setUploadedImages(product.uploadedImages);
    } else {
      console.error('Product not found');
    }
  }, [productId]);

  const handleImageChange = (imageFile: File) => {
    const newImageURL = URL.createObjectURL(imageFile);
    setUploadedImages([...uploadedImages, newImageURL]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    const updatedProduct = { ...product, uploadedImages };

    const products: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');
    const existingProductIndex = products.findIndex(p => p.id === productId);

    if (existingProductIndex !== -1) {
      products[existingProductIndex] = updatedProduct;
    } else {
      products.push(updatedProduct);
    }

    localStorage.setItem('product', JSON.stringify(products));

    navigate(`/genvision/${userId}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 bg-black mx-7 my-7 flex">
      <div className="w-1/3 bg-white border-[#D4D4D4]">
        <div className="h-[350px] bg-white p-4 rounded-b-lg">
          <h1 className="font-bold text-[#000000] mx-2 text-xl">
            Add Additional Images
          </h1>
          <div className="mt-4 mx-2">
            <div className="mx-0">
              <UploadButton onImageChange={handleImageChange} />
            </div>
            <form className="mt-4" action="" onSubmit={handleSubmit}>
              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Brand Name"
                  label="Brand"
                  inputValue={product.brand}
                  setInput={() => {}}
                  name="brand"
                  disabled={true}
                />
              </div>
              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Product Name"
                  label="Product"
                  inputValue={product.productName}
                  setInput={() => {}}
                  name="productName"
                  disabled={true}
                />
              </div>

              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Product Id Required."
                  label="Product ID"
                  inputValue={product.id}
                  setInput={() => {}}
                  name="productId"
                  disabled={true}
                />
              </div>

              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Category Required."
                  label="Category"
                  inputValue={product.category}
                  setInput={() => {}}
                  name="category"
                  disabled={true}
                />
              </div>

              <div className="mb-4 flex">
                <div className="mr-2 flex-1">
                  <label
                    htmlFor="quantity"
                    className="block font-bold text-[#000000]"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity Required."
                    className="border border-grey-300 shadow p-1 w-full rounded"
                    value={product.quantity}
                    disabled
                  />
                </div>

                <div className="mr-2 flex-1">
                  <label
                    htmlFor="price"
                    className="block font-bold text-[#000000]"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price Required."
                    className="border border-grey-300 shadow p-1 w-full rounded"
                    value={product.price}
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block font-bold text-[#000000]"
                >
                  Manufacturing / Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="Manufacturing / Expiry Date Required."
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={product.expiryDate}
                  disabled
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-medium rounded-md cursor-pointer border border-violet-600"
                  onClick={() => navigate(`/genvision/${userId}`)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#623FC4] w-1/2 items-center justify-center font-medium rounded-md cursor-pointer text-white"
                >
                  Done
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
  );
};

export default UploadAdditionalImage;
