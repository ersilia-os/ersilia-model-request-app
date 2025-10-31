interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-2xl mb-2 font-semibold text-plum">{title}</h2>

      {description && <p className="text-gray-400">{description}</p>}
    </div>
  );
}
