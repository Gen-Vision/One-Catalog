import { ChangeEvent } from 'react';

interface UploadButtonProps {
  onImageChange: (imageFile: File) => void;
}

function UploadButton({ onImageChange }: UploadButtonProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
      onImageChange(selectedFile);
    }
  };

  return (
    <label className="mt-5  tracking-wide font-semibold bg-[#623FC4] text-gray-100 w-full py-2  rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none cursor-pointer">
      <input type="file" className="hidden" onChange={handleFileChange} />
      <UploadIcon />
      <span className="ml-4 whitespace-nowrap">Upload product images</span>
    </label>
  );
}

export default UploadButton;

function UploadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon/upload-cloud">
        <path
          id="Vector"
          d="M2.66657 9.93284C2.17126 9.42679 1.79761 8.81465 1.57392 8.1428C1.35023 7.47095 1.28237 6.75701 1.37547 6.05504C1.46858 5.35308 1.7202 4.68151 2.1113 4.0912C2.50239 3.50089 3.02269 3.00732 3.63279 2.64788C4.24289 2.28843 4.92679 2.07255 5.63268 2.01656C6.33857 1.96058 7.04795 2.06597 7.70708 2.32475C8.36621 2.58353 8.9578 2.98892 9.43706 3.5102C9.91631 4.03149 10.2706 4.655 10.4732 5.33351H11.6666C12.3102 5.33344 12.9369 5.54039 13.4539 5.9238C13.9709 6.30721 14.3509 6.84675 14.5377 7.46271C14.7246 8.07867 14.7084 8.7384 14.4915 9.34443C14.2746 9.95045 13.8685 10.4707 13.3332 10.8282"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M8 8V14"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_3"
          d="M10.6663 10.6667L7.99967 8L5.33301 10.6667"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}
