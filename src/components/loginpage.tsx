import { BrandLogo } from './sidebar';
import { Separator } from './ui/separator';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center p-7 box-content">
      <div className="flex flex-col flex-grow-1 items-center justify-start shadow-md  p-5">
        <div className="flex flex-col flex-grow-1 items-center justify-start  p-5">
          <BrandLogo></BrandLogo>

          <h1 className="my-5 text-[#000000] mb-5 text-xl font-semibold">
            Gen Vision
          </h1>
          <h6 className="text-sm">Log in to Auth0 to continue to Auth0</h6>
          <h6 className="text-sm">Dashboard.</h6>
          <form className="w-full my-7">
            <input
              className="border border-[#C2C8D0] p-3 w-full rounded-sm"
              type="text"
              placeholder="Email Address"
            ></input>
          </form>
          <button className="bg-[#623FC4] w-full items-center p-3.5 mb-5 justify-center font-semibold rounded-md cursor-pointer text-white">
            Login
          </button>
          <h6>
            Don’t have an account? <a className="text-cyan-500">Signup</a>
          </h6>
        </div>
      </div>
    </div>
  );
}
