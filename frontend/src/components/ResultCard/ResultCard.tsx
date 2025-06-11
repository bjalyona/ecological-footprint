import type { FootprintResultWithDate } from "../../pages/History";

interface ResultCardProps {
  result: FootprintResultWithDate;
  onClick: () => void;
}

export default function ResultCard({ result, onClick }: ResultCardProps) {
  return (
    <div onClick={onClick}>
      <p><strong>Дата:</strong> {new Date(result.createdAt).toLocaleString()}</p>
      <p><strong>След gha:</strong> {result.gha.toFixed(2)}</p>
      <p><strong>CO₂:</strong> {result.co2KgPerYear.toFixed(0)}</p>
    </div>
  );
}
