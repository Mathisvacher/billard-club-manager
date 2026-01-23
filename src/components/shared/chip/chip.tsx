interface ChipProps {
  label: string;
  className?: string;
}

export const Chip = ({ label, className = "" }: ChipProps) => {
  return (
    <span
      className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold ${className}`}
    >
      {label}
    </span>
  );
};
