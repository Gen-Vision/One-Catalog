interface InfoBoxProps {
  title: string;
  description: any;
  className?: string;
}

export default function InfoBox({
  title,
  description,
  className,
}: InfoBoxProps) {
  const containerClassName = `flex flex-col border rounded border-[#623FC4] px-4 py-2 my-4 ${
    className || ''
  }`;

  return (
    <div className={containerClassName}>
      <h2 className="text-sm font-semibold mr-2">{title}</h2>
      <p className="text-[#64748B]">{description}</p>
    </div>
  );
}
