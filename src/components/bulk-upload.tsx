import React, { useState } from 'react';
import Button from '@material-tailwind/react/components/Button';
import { productApi } from '../services/productApi';
import { toast } from 'react-toastify';

interface ProductData {
  _id?: string;
  category: string;
  uploadedImages: string[];
  brand: string;
  productName: string;
  quantity: string;
  price: string;
  expiryDate: string;
}

const BulkUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [existingProducts, setExistingProducts] = useState<ProductData>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvData = event.target?.result as string;
        const productData = processCsvData(csvData);
  
        try {
          // Fetch existing products from the API
          // const existingProductsResponse =  productApi.getProducts();
          // const existingProducts: ProductData[] = existingProductsResponse.products;
          productApi.getProducts(
            (data:any) =>{
              setExistingProducts(data.product);
            },(error:any) => {
              console.log(error);
            }
          );
  
          // Loop through new products and update or add them via the API
          for (const newProduct of productData) {
            // const existingProductIndex = existingProducts!.findIndex((p) => p._id === newProduct._id);
  
            // if (existingProductIndex !== -1) {
            //   // Update existing product
            //   productApi.updateProduct(newProduct.id, newProduct);
            // } else {
              // Add new product
              await productApi.createProduct(newProduct,
                (data:any) => {

                },(error:any) => {
                  console.error(error);
                }

              );
            // }
          }
  
          toast.success('Products updated successfully');
        } catch (error) {
          toast.error('Error updating products');
          console.error('Error updating products:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const processCsvData = (csvData: string): ProductData[] => {
    const lines = csvData.split('\n');
    const header = lines[0].split(','); // Assuming the first line contains headers
  
    const products: ProductData[] = lines.slice(1).map((line) => {
      const values = line.split(',');
      const product: ProductData = {
        // _id: values[header.indexOf('id')],
        category: values[header.indexOf('category')],
        uploadedImages: [], // Modify this based on your actual structure
        brand: values[header.indexOf('brand')],
        productName: values[header.indexOf('productName')],
        quantity: values[header.indexOf('quantity')],
        price: values[header.indexOf('price')],
        expiryDate: values[header.indexOf('expiryDate')],
      };
      return product;
    });
  
    return products;
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" onChange={handleFileChange} /><br />
      <Button className="text-white bg-[#623FC4] fs-2" placeholder="a" variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default BulkUpload;
