import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Separator } from '@/components/ui/separator';
import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 border-l-[1px] relative px-6">
        <Navbar />
        <Separator />
        <Outlet />
      </div>
    </div>
  );
}
