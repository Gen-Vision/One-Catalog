import { useEffect, useState } from 'react';
import { TrashIcon, BarsArrowUpIcon, ArrowUpOnSquareStackIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, CardBody, Avatar, Button, Input } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import BulkUpload from "./bulk-upload";
import {logo2, dlogout, mllanguage} from "../assets/logo"
import { useTranslation } from 'react-i18next';

interface TableRow {
  no: number;
  img: string;
  product_id: string;
  brand: string;
  product_name: string;
  product_category: string;
  price: string;
  stock_units: number;
  expiry_date: string;
}

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

const TABLE_HEAD = ["", "No", "Image", "Product ID", "Brand", "Product Name", "Product Category", "Price", "Stock units", "Expiry Date"];

const PAGE_SIZE = 10;

export default function Dashboard() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [TABLE_ROWS, setTableRows] = useState<TableRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const {userId} = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = TABLE_ROWS.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalItems);

  const visibleRows = TABLE_ROWS.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // Retrieve product data from localStorage
    const storedProductData: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');

    // Map the stored product data to TableRow format
    const transformedRows: TableRow[] = storedProductData.map((product, index) => ({
      no: index + 1,
      img: product.uploadedImages[0],
      product_id: product.id,
      brand: product.brand || '',
      product_name: product.productName || '',
      product_category: product.category || '',
      price: product.price ? `Rs. ${product.price}` : '',
      stock_units: product.quantity || 0,
      expiry_date: product.expiryDate || '',
    }));

    // Now, transformedRows contains the data in the TableRow format
    // console.log(transformedRows);

    // For future use with API
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('your-api-endpoint');
    //     const data = await response.json();
    //     setTableRows(data || transformedRows);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setTableRows(transformedRows);
    //   }
    // };

    // fetchData();

    // Using transformedRows directly for now
    setTableRows(transformedRows);
  }, []);

  const handleAddNewProductClick = () => {
    navigate(`/genvision/${userId}/upload`);
  };

  const changeModalState = () => {
    setIsModalOpen(!isModalOpen);
    // After processing, trigger a page refresh
    if (isModalOpen) window.location.reload();
  };

  const handleLogOut = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('userId');
    navigate("/");
  }

  //language change
  const {i18n} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const languages = ['en', 'fr', 'hi', 'bn']; 
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <>
    <nav className='mt-2 navbar-hover-glow' style={{ borderBottom: '1px solid #ccc',paddingTop:'10px', paddingBottom:'20',marginRight: '10px' }}>
      <div style={{marginLeft:'40px'}}>
      <img
          className="inline-block align-middle pb-8"
          src={logo2}
          alt="Gen_Vision"
        />
        <div className='float-right'>
          <button
            onClick={() => setIsOpen(!isOpen)}
          >
          <img
              className="inline-block align-middle pr-8 pb-8"
              src={mllanguage}
              alt="multi language"
            />
            </button>

             {/* language option        */}
              {isOpen && (
                <div className="absolute right-0 top-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-2">
                  {languages.map((lng) => (
                    <button
                      key={lng}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => changeLanguage(lng)}
                    >
                      {lng}
                    </button>
                  ))}
                </div>
              )}


            <button
              onClick={handleLogOut}
              className='relative group'
            >
            <img
                className="inline-block align-middle pr-4 pb-8"
                src={dlogout}
                alt="logout"
              />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Logout
                </span>
              </button>
        </div>
      </div>
    </nav>


      <Card placeholder="a" style={{ marginTop: '50px', zIndex:'1'}}>
        <CardHeader placeholder="a" floated={true} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row p-2">

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="text-white bg-[#623FC4] fs-2 flex items-center gap-2" placeholder="a" variant='outlined' onClick={handleAddNewProductClick}>
                <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add new product
              </Button>
              <Button className="text-[#623FC4] border-[#623FC4] fs-2 flex items-center gap-2" placeholder='a' variant="outlined" size="sm" onClick={changeModalState}>
                Bulk upload
                <ArrowUpOnSquareStackIcon strokeWidth={2} className="h-10 w-10" />
              </Button>

              {
        isModalOpen && (
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, // Adjust based on the height and margin of the dropdown div
              left: 0, 
              width: '100vw', 
              height: '100vh', // Adjust to account for the height of the dropdown div
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: '10px' // Optional padding to space the modal content
            }}
            onClick={() => setIsModalOpen(!isModalOpen)} // Close modal when clicking outside content
          >
            <div 
              style={{ 
                position: 'relative', 
                width: '80vw', 
                height: '95vh', 
                backgroundColor: 'white', 
                padding: '20px',
                zIndex: 1001,
                overflow: 'auto' 
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
            >
            <BulkUpload/>
            </div>
          </div>
        )
}

            </div>

            <div className="flex items-center space-x-2">
              <Button placeholder='a' className="text-gray  flex items-center gap-2 border shadow-[none]">
                <BarsArrowUpIcon strokeWidth={2} className="h-8 w-8" /> Scan
              </Button>
              <Input
                crossOrigin='a'
                type="text"
                placeholder="Search"
                // size='sm'
                className="outline-none border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              />
              <Button className=" border-[gray]" placeholder='a' variant="outlined" size="sm">
                Export as ZIP
              </Button>
              <Button placeholder='a' className="text-gray border shadow-[none]">
                <TrashIcon strokeWidth={2} className="h-8 w-8" />
              </Button>
            </div>

          </div>
        </CardHeader>
        <CardBody placeholder="a" className="overflow-scroll px-0">
        {/* <div className="max-w-screen-md mx-auto"> */}
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    // style={{ width:'10vw'}} 
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      placeholder="a"
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map(
                ({ no, img, product_id, brand, product_name, product_category, price, stock_units, expiry_date }, index) => {
                  const isLast = index === visibleRows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={no} onClick={() => navigate(`/genvision/userId/${product_id}`)} style={{ cursor: 'pointer' }}>
                      <td className={classes}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          const newSelectedRows = selectedRows.includes(no)
                            ? selectedRows.filter((row) => row !== no)
                            : [...selectedRows, no];
                          setSelectedRows(newSelectedRows);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(no)}
                          onChange={() => {}}
                        />
                      </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {no}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Avatar src={img} alt={brand} size="sm" placeholder="avatar" />
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {product_id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {brand}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {product_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {product_category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {stock_units}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {expiry_date}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
          {/* </div> */}

          {/* Pagination controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>

        </CardBody>
    </Card>
    </>
  );
}
