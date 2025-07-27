interface TitleProps {
  name: string;
  className?: string;
}

export default function Title({ name, className }: TitleProps) {
  return (
    <h1 className={`text-2xl lg:text-4xl font-bold text-purple-600 mb-8 ${className || ''}`}>
      {name}
    </h1>
  );
}
