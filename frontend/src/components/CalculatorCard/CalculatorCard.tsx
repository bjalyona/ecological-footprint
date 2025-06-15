import { useState } from "react";
import Button from "../Button/Button";
import './CalculatorCard.css';

interface CalculatorCardProps {
  question: string
  options: number[] | boolean[]
  onSelect: (value: number) => void
}

export default function CalculatorCard({ question, options, onSelect } : CalculatorCardProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleNext = () => {
    if (selected !== null) {
      onSelect(selected)
      setSelected(null)
    }
  }

  
  return (
    <div className="card">
        <h2 className="question">{question}</h2>
      <div className="options">
        {options.map(option => (
          <button
            key={Number(option)}
            className={`option-button ${selected === option ? 'selected' : ''}`}
            onClick={() => setSelected(Number(option))}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="button-container">
        <Button variant="primary" className="next-button" onClick={handleNext}>
        Далее
      </Button>
      </div>
    </div>
  );
}
