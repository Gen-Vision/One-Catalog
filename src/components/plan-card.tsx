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
    <Card className="border border-indigo-600 w-72 m-4 block overflow-hidden text-[#170F49]">
      <CardHeader>
        <CardTitle className="font-extrabold font-mono">
          <span className="text-3xl font-bold">{title} </span>({tag})
        </CardTitle>
        <CardDescription>
          <Outlet />
          <h1 className="mb-2"> $0/month</h1>

          <button
            className="bg-[#623FC4] rounded py-1.5 px-8 text-white"
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
              <li className="flex py-1" key={title + note}>
                <img className="w-4 h-4 mt-1 mr-2" src={check} alt="" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
