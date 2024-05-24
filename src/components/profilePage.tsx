import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../services/productApi';
import { toast } from 'react-toastify';

interface ProductData {
  _id: string;
  category: string;
  uploadedImages: string[];
  brand?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  expiryDate?: string;
  manufacturingDate?: string;
}

const ProfilePage: React.FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const { userId, productId } = useParams<{ userId: string; productId: string }>();

  useEffect(() => {
    productApi.getProduct(
      productId!,
      (data: any) => {
        setProduct(data.product);
      },
      (error: any) => {
        toast.error('Error fetching product data');
        console.error('Error fetching product data:', error);
      }
    );
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 bg-black mx-7 my-7 flex">
      <div className="w-1/3 bg-white border-[#D4D4D4]">
        <div className="h-[350px] bg-white p-4 rounded-b-lg">
          <h1 className="font-bold text-[#000000] mx-2 text-xl">Product Profile</h1>
          <div className="mt-4 mx-2">
            <div className="mb-4">
              <label className="block font-bold text-[#000000]">Product ID</label>
              <p>{product._id}</p>
            </div>
            <div className="mb-4">
              <label className="block font-bold text-[#000000]">Brand</label>
              <p>{product.brand || 'N/A'}</p>
            </div>
            <div className="mb-4">
              <label className="block font-bold text-[#000000]">Product Name</label>
              <p>{product.productName || 'N/A'}</p>
            </div>
            <div className="mb-4">
              <label className="block font-bold text-[#000000]">Category</label>
              <p>{product.category}</p>
            </div>
            <div className="mb-4 flex">
              <div className="mr-2 flex-1">
                <label className="block font-bold text-[#000000]">Quantity</label>
                <p>{product.quantity || 'N/A'}</p>
              </div>
              <div className="mr-2 flex-1">
                <label className="block font-bold text-[#000000]">Price</label>
                <p>{product.price || 'N/A'}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-bold text-[#000000]">Manufacturing Date</label>
              <p>{product.manufacturingDate || 'N/A'}</p>
            </div>
            <div className="mb-4">
              <label className="block font-bold text-[#000000]">Expiry Date</label>
              <p>{product.expiryDate || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-white p-8">
        <div className="grid grid-cols-3 gap-4 border p-5 rounded-md border-[#623FC4]">
          {product.uploadedImages.map((imageSrc, index) => (
            <div key={index} className="flex w-[200px] h-[200px]">
              <img src={imageSrc} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
