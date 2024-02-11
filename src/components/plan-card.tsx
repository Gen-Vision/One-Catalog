import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Outlet } from 'react-router-dom';
import { check } from '../assets/logo';
interface IPlanCardProps {
  title: string;
  tag?: string;
  onSelect?: () => void;
  notes: string[];
}

export function PlanBox({ title, tag, onSelect, notes }: IPlanCardProps) {
  return (
    <Card className="border border-indigo-600 w-80 m-4 block overflow-hidden text-[#170F49]">
      <CardHeader>
        <CardTitle className="flex flex-row items-baseline my-3">
          <h6 className="text-3xl font-bold ">{title}</h6>
          <h6 className="text-sm">({tag})</h6>
        </CardTitle>
        <CardDescription>
          <Outlet />
          <h1 className="mb-2">
            <span className="text-black text-5xl font-bold">$0 </span>/monthly
          </h1>

          <button
            className="bg-[#623FC4] rounded py-1.5 px-8 text-white text-xs"
            onClick={onSelect}
          >
            Get Started
          </button>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-[#F1EEFA] flex-col p-6 rounded-b-lg m-0 justify-center items-center">
          <p className="mb-3 font-bold">What's included</p>
          <ul>
            {notes.map(note => (
              <li className="flex items-center py-1 my-2" key={title + note}>
                <img className="w-4 h-4 mt-1 mr-2" src={check} alt="" />
                <h6 className="md:text-md text-sm">{note}</h6>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
