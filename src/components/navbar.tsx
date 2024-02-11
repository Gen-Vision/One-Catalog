import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="bg-[#FFFFFF] py-1 px-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {[
          { to: '/genvision/dashboard', title: 'Dashboard' },
          { to: '/genvision/edit', title: 'Edit Image' },
          { to: '/genvision/mockup/assets', title: 'Mockup' },
          { to: '/genvision/text', title: 'Text' },
          { to: '/genvision/social-media', title: 'Social Media' },
          { to: '/genvision/3d-model', title: '3D Model' },
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
        <button className="bg-white font-semibold hover:bg-[#623FC4] hover:text-white  text-Black py-2 px-4 rounded">
          Download all
        </button>
        <button className="bg-[#623FC4] font-semibold border hover:bg-white hover:text-black hover:border hover:border-[#623FC4] text-white py-2 px-4 rounded">
          Generate all
        </button>
      </div>
    </div>
  );
};

export default NavBar;
