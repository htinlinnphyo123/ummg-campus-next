interface TitleProps { name: string; className?: string; }
export default function Title({ name, className = "" }: TitleProps) {
  return <h2 className={`section-title ${className}`}>{name}</h2>;
}
