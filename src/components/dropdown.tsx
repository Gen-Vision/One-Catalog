import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import UploadImage from './uploadimage';

const Dropdown = ({ container }: { container: HTMLElement }) => {
  return (
    <>
      <Sheet modal={true} onOpenChange={props => props}>
        <SheetTrigger className="flex justify-items-start" asChild>
          <div className="bg-[#FFFFFF] py-1 px-2 flex justify-between items-center">
            <div className="flex items-center space-x-4 cursor-pointer">
              Add new product
            </div>
            <div className="flex space-x-4"></div>
          </div>
        </SheetTrigger>
        <SheetContent side={'top'}>
          <SheetHeader>
            <UploadImage />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Dropdown;
