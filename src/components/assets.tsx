import { Separator } from './ui/separator';

export default function Assets() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 flex mx-5">
        <div className="w-1/3 bg-white  border-[#D4D4D4]">
          <div className="flex items-center ml-9 gap-x-16 mt-8 px-7"></div>
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
    </div>
  );
}
