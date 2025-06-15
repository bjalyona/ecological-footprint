import { useEffect, useState } from "react";
import { getHistory } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import ResultCard from "../../components/ResultCard/ResultCard";
import FootprintStats from "../../components/FootprintStats/FootprintStats";
import type { FootprintResult } from "../../utils/calculateFootprint";
import './History.css'

export type FootprintResultWithDate = FootprintResult & {
  id: string;
  createdAt: string;
};

export default function History() {
  const { token } = useAuth();
  const [results, setResults] = useState<FootprintResultWithDate[]>([]);
  const [selectedResult, setSelectedResult] =
    useState<FootprintResultWithDate | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (token) {
        try {
          const res = await getHistory(token);
          setResults(res.data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetch();
  }, [token]);

  if (selectedResult) {
    return (
      <div>
        <button onClick={() => setSelectedResult(null)}>Назад</button>
        <FootprintStats result={selectedResult} />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container">
        <p>Войдите или зарегистрируйтесь, чтобы увидеть историю</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="history-header">История расчета вашего экологического следа</h2>
      {results.length === 0 ? (
        <p>Нет сохраненных результатов</p>
      ) : (
        <div className="history-container">
          {results.map((result) => (
            <ResultCard
              key={result.id}
              result={result}
              onClick={() => setSelectedResult(result)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
