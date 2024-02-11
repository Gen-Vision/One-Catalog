import { useState } from 'react';

interface FeatureProps {
  title: string;
  description: string;
  onSelect: (selected: boolean) => void;
}

function Feature({ title, description, onSelect }: FeatureProps) {

  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected((prevIsSelected) => {
      const newSelectedState = !prevIsSelected;
      onSelect(newSelectedState);
      return newSelectedState;
    });
  };

  return (
    <div className="my-4">
      <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
        <h2 className="text-sm font-semibold mr-2">{title}</h2>
      </div>
      <p className="ml-7 text-[#64748B]">{description}</p>
    </div>
  );
}

export default Feature;
