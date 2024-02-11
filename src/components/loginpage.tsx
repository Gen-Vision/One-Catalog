import { BrandLogo } from './sidebar';
import { Separator } from './ui/separator';
import linkedIn48 from '../assets/icons/linkedIn48.png';
import microsoft48 from '../assets/icons/microsoft48.png';
import google48 from '../assets/icons/google48.png';
import github48 from '../assets/icons/github48.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface login {
  isOauth: boolean;
}
export default function Login({ isOauth }: login) {
  const [emailId, setEmailId] = useState('');
  const navigate = useNavigate();
  const handleSubmit = () => {
    // logic
    navigate('/plans');
  };
  return (
    <div className="flex flex-col items-center justify-center p-7 box-content">
      <div className="flex flex-col flex-grow-1 items-center justify-start shadow-md  p-3">
        <div className="flex flex-col flex-grow-1 items-center justify-start  p-3">
          <BrandLogo></BrandLogo>

          <h1 className="my-5 text-[#000000] mb-5 text-xl font-semibold">
            Gen Vision
          </h1>
          <h6 className="text-sm">Log in to Auth0 to continue to Auth0</h6>
          <h6 className="text-sm">Dashboard.</h6>
          <form className="w-full my-3" onSubmit={handleSubmit}>
            <input
              className="border border-[#C2C8D0] p-3 w-full rounded-sm mb-5"
              type="text"
              value={emailId}
              onChange={e => setEmailId(e.target.value)}
              placeholder="Email Address"
            ></input>
            <button
              className="bg-[#623FC4] w-full items-center p-3.5 mb-5 justify-center font-semibold rounded-md cursor-pointer text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          <h6 className="text-xs">
            Don’t have an account? <a className="text-cyan-500">Signup</a>
          </h6>
        </div>
        {isOauth && (
          <div className="h-full">
            <button className="border border-[#C2C8D0] my-2 p-1 w-full  flex flex-row items-center justify-around">
              <img src={linkedIn48} alt="" />
              <h6 className="">Continue with LinkedIn</h6>
            </button>
            <button className="border border-[#C2C8D0] my-2 p-1 w-full  flex flex-row items-center justify-around">
              <img src={microsoft48} alt="" />
              <h6>Continue with Microsoft</h6>
            </button>
            <button className="border border-[#C2C8D0] my-2 p-1 w-full  flex flex-row items-center justify-around">
              <img src={github48} alt="" />
              <h6>Continue with Github</h6>
            </button>
            <button className="border border-[#C2C8D0] my-2 p-1 w-full  flex flex-row items-center justify-around">
              <img src={google48} alt="" />
              <h6>Continue with Google</h6>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
