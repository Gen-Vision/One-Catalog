import { NavLink } from 'react-router-dom';
import { Separator } from './ui/separator';

export default function Mockup() {
  return (
    <div className=" flex  ">
      <div className="w-1/3 border-[#D4D4D4] ">
        <div className="flex items-center ml-0 gap-x-16 mt-8 px-7">
          {[
            { to: '/mockup/assets', title: 'Assets' },
            { to: '/mockup/prompt', title: 'Prompt' },
          ].map(mockup => (
            <NavLink
              to={mockup.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#623FC4] px-16 py-1  border-b-2 border-[#623FC4]'
                  : 'px-16 py-1'
              }
            >
              <div className="text-Black font-semibold tracking-wide px-2 py-1 ">
                {mockup.title}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="h-[350px] bg-white my-5 rounded-b-lg flex flex-col">
          <h1 className="text-[#000000] mx-1 my-1 text-base font-semibold ">
            Select one image to create mockup
          </h1>
          <div className="flex-grow"></div>

          <div className="flex gap-4 my-8">
            <button
              className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold  rounded-md cursor-pointer border border-violet-600"
              disabled
            >
              Next
            </button>
            <button className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold  rounded-md cursor-pointer text-white">
              Generate
            </button>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" className="" />
      <div className="w-2/3 bg-white p-8">
        <div className="w-full border h-[350px] rounded-md border-[#623FC4]"></div>
      </div>
    </div>
  );
}
