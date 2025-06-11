import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import ResultCard from "../components/ResultCard/ResultCard";
import FootprintStats from "../components/FootprintStats/FootprintStats";
import type { FootprintResult } from "../utils/calculateFootprint";

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
    return <p>Войдите или зарегистрируйтесь, чтобы увидеть историю</p>;
  }

  return (
    <>
      {results.length === 0 ? (
        <p>Нет сохраненных результатов</p>
      ) : (
        <div>
          {results.map((result) => (
            <ResultCard
              key={result.id}
              result={result}
              onClick={() => setSelectedResult(result)}
            />
          ))}
        </div>
      )}
    </>
  );
}
