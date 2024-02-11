import { useState, FormEvent } from 'react';
import UploadButton from './uploadbtn';
import { amazon, flipkart } from '@/assets/logo';
import { Switch } from './ui/switch';

interface ProductData {
  id: string;
  category: string;
  uploadedImages: string[];
  brand?: string | undefined;
  productName?: string | undefined;
  quantity?: number | undefined;
  price?: number | undefined;
  expiryDate?: string | undefined;
}

const UploadImage = () => {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productId, setProductId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [productName, setProductName] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState<string | undefined>(undefined);

  const handleImageChange = (imageFile: File) => {
    // setSelectedImage(imageFile);
    setUploadedImages([...uploadedImages,URL.createObjectURL(imageFile)]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create an object with product id, category, and image URL
    const productData: ProductData = {
      id: productId,
      category,
      uploadedImages,
      brand,
      productName,
      quantity,
      price,
      expiryDate,
    };

    console.log('Product Data:', productData);

    const product: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');

      // Check if the product with the same id already exists
      const existingProductIndex = product.findIndex((p) => p.id === productId);

      // If exists, update the existing product, otherwise add a new one
      if (existingProductIndex !== -1) {
        product[existingProductIndex] = productData;
      } else {
        product.push(productData);
      }

      // Save the updated product array to localStorage
      localStorage.setItem('product', JSON.stringify(product));

    // Add the image URL to the uploadedImages state
    // if (productData.imageUrl) {
    //   setUploadedImages([...uploadedImages, productData.imageUrl]);
    // }

    // Reset form fields and the selected image
    setProductId('');
    setCategory('');
    // setSelectedImage(null);
    setBrand('');
    setProductName('');
    setPrice(undefined);
    setQuantity(undefined);
    setExpiryDate('');
    setUploadedImages([]);
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
                  htmlFor="brand"
                  className="block font-bold text-[#000000]"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="Brand Required."
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block font-bold text-[#000000]"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Product Name Required."
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
              </div>
              
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
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value))}
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
                  value={price}
                  onChange={e => setPrice(parseInt(e.target.value))}
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
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                />
              </div>

              {/* <div className="flex  gap-4 items-center mb-4">
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
              </div> */}

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
