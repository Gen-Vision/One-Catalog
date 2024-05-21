import { NavLink, useParams } from 'react-router-dom';
import {useState} from 'react';
import UploadAdditionalImage from './uploadadditionalimage';

const NavBar = () => {
  const {productId} = useParams();
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  
  return (
    <>
        <nav className='mt-2 navbar-hover-glow' style={{ borderBottom: '1px solid #ccc',paddingTop:'10px', paddingBottom:'20',marginRight: '10px' }}>
      {/* <div style={{marginLeft:'40px'}} onClick = {()=>setIsModalOpen(!isModalOpen)}>
          Click
      </div> */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid #ccc' }}>
      {/* Product ID on the left */}
      <span>Product ID: {productId}</span>

      {/* Dropdown button on the right */}
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setIsModalOpen(!isModalOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px 10px' }}
        >
          ▼
        </button>
      </div>
      </div>
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
              <UploadAdditionalImage />
            </div>
          </div>
        )
}
    </nav>
    <div className="bg-[#FFFFFF] py-1 px-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {[
          { to: `/genvision/:userId/${productId}/edit`, title: 'Edit Image' },
          { to: `/genvision/:userId/${productId}/mockup/1`, title: 'Mockup' },
          { to: `/genvision/:userId/${productId}/text`, title: 'Text' },
          { to: `/genvision/:userId/${productId}/social-media`, title: 'Social Media' },
          { to: `/genvision/:userId/${productId}/3d-model`, title: '3D Model' }
        ].map(t => (
          <NavLink
            to={t.to}
            className={({ isActive }) =>
              isActive
                ? 'text-[#623FC4] bg-[#F1EEFA] rounded px-2 py-1'
                : 'rounded px-2 py-1'
            }
          >
            <span className="text-Black font-semibold tracking-wide px-2 py-1 ">
              {t.title}
            </span>
          </NavLink>
        ))}

        {/* <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          <Link to={'/mockup'}> Mockup</Link>
        </a>
        <a
          href=""
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          Text
        </a>
        <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          <Link to={'/socialMedia'}> Social Media</Link>
        </a>
        <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          <Link to={'/3dModel'}> 3D Model</Link>
        </a> */}
      </div>
      <div className="flex space-x-4">
        <button className="bg-white border border-purple-500 font-semibold hover:bg-[#623FC4] hover:text-white  text-Black py-2 px-4 rounded">
          Download
        </button>
        <button className="bg-[#623FC4] font-semibold border hover:bg-white hover:text-black hover:border hover:border-[#623FC4] text-white py-2 px-4 rounded">
          Publish
        </button>
        
      </div>
    </div>
    </>
  );
};

export default NavBar;
