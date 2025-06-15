import type { FootprintResultWithDate } from "../../pages/History/History";
import "./ResultCard.css";

interface ResultCardProps {
  result: FootprintResultWithDate;
  onClick: () => void;
}

export default function ResultCard({ result, onClick }: ResultCardProps) {
  return (
    <div className="result-card" onClick={onClick}>
      <p className="result-date">
        {new Date(result.createdAt).toLocaleString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div className="result-descr">
        <p className="result-amount">
          <strong>След gha:</strong> {result.gha.toFixed(2)}
        </p>
        <p className="result-amount">
          <strong>CO₂:</strong> {result.co2KgPerYear.toFixed(0)}
        </p>
      </div>
    </div>
  );
}
