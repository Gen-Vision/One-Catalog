import Button from '@material-tailwind/react/components/Button';
import React, { useState } from 'react';

interface ProductData {
  id: string;
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile||null);
  };

  const handleSubmit = () => {
    if (file) {
      // Read the file and convert it to an object
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        // Process the CSV data and convert it to an object (implement your logic here)
        const productData = processCsvData(csvData);
  
        // Retrieve existing products from localStorage
        const existingProducts: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');
  
        // Loop through new products and update localStorage
        productData.forEach(newProduct => {
          // Check if the product with the same id already exists
          const existingProductIndex = existingProducts.findIndex((p) => p.id === newProduct.id);
  
          // If exists, update the existing product, otherwise add a new one
          if (existingProductIndex !== -1) {
            existingProducts[existingProductIndex] = newProduct;
          } else {
            existingProducts.push(newProduct);
          }
        });
  
        // Save the updated product array to localStorage
        localStorage.setItem('product', JSON.stringify(existingProducts));
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
        id: values[header.indexOf('id')],
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
      <Button className="text-white bg-[#623FC4] fs-2" placeholder="a" variant='outlined' onClick={handleSubmit}>
            Submit
      </Button>
    </div>
  );
};

export default BulkUpload;
