interface MatchesCardColumnProps {
  label: string;
  valuePlayer1: number | string;
  valuePlayer2: number | string;
}

export default function MatchesCardColumn({
  label,
  valuePlayer1,
  valuePlayer2,
}: MatchesCardColumnProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-medium">{label}</p>
      <CardValue value={valuePlayer1} />
      <CardValue value={valuePlayer2} />
    </div>
  );
}

interface CardValueProps {
  value: number | string;
}
const CardValue = ({ value }: CardValueProps) => {
  return <p className="font-semibold"> {value}</p>;
};
