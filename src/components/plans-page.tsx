import { useNavigate } from 'react-router-dom';
import { logo } from '../assets/logo';
import { PlanBox } from './plan-card';

export default function Pricing() {
  const navigate = useNavigate();

  const planData = {
    notes: [
      'All analytics feature',
      'Up to 250,000 tracked visits',
      'Normal support',
      'Up to 3 team members',
    ],
  };

  return (
    <div className="container">
      <div className="flex justify-center items-center bg-[#FFF] dark:bg-blue-500">
        <img
          className="inline-block align-middle p-4 pb-8"
          src={logo}
          alt="Gen_Vision"
        />
        <h1 className="mb-2 text-2xl font-bold text-[#170F49]">
          Welcome to Gen Vision
        </h1>
      </div>
      <h3 className="mb-8 text-center text-[#170F49]">
        Select an industry to continue
      </h3>
      <div className="flex flex-row items-center justify-center w-full flex-wrap">
        {['E-Com', 'Audio Book'].map(title => (
          <PlanBox
            key={title}
            title={title}
            tag="Beta"
            onSelect={() => {
              console.log('this is ');
              navigate('/genvision');
            }}
            {...planData}
          />
        ))}
      </div>
    </div>
  );
}
