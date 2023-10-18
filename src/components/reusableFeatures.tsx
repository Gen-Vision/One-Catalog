import { Checkbox } from './ui/checkbox';

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div className="my-4">
      <div className="flex items-center gap-3">
        <Checkbox />
        <h2 className="text-sm font-semibold mr-2">{title}</h2>
      </div>
      <p className="ml-7 text-[#64748B]">{description}</p>
    </div>
  );
}

export default Feature;
