import { ModeToggle } from './components/mode-toggle';
import NavBar from './components/navbar';
import Pricing from './components/plans-page';
import UploadImage from './components/uploadimage';

export default function Home() {
  return (
    <>
      <div className="flex">
        <div className="flex-grow">
          <div className="p-4">
            <NavBar />
            <UploadImage />
            <ModeToggle />
            <Pricing />
          </div>
        </div>
      </div>
    </>
  );
}
