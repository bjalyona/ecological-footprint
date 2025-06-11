import { useState } from "react";
import CalculatorCard from "../../components/CalculatorCard/CalculatorCard";
import "./Calculator.css";
import {
  calculateFootprint,
  type FootprintResult,
} from "../../utils/calculateFootprint";

import { questions } from "../../utils/questions";
import FootprintStats from "../../components/FootprintStats/FootprintStats";

const initialData: UserInput = {
  meatMealsPerWeek: 0,
  dairyMealsPerWeek: 0,
  localVegMealsPerWeek: 0,
  importedVegMealsPerWeek: 0,
  carKmPerWeek: 0,
  carIsElectric: false,
  publicTransportKmPerWeek: 0,
  bicycleKmPerWeek: 0,
  flightHoursPerYear: 0,

  electricityKWhPerMonth: 0,
  gasM3PerMonth: 0,
  solarPanels: false,
  housingSize: 0,
  numberOfPeopleInHouse: 0,

  clothesPerMonth: 0,
  electronicsPerYear: 0,
  shoppingScore: 0,

  recycles: false,
  composts: false,
  reusesItems: false,

  waterLitersPerDay: 0,

  streamingHoursPerWeek: 0,
  cloudStorageGB: 0,
};

export type UserInput = {
  meatMealsPerWeek: number;
  dairyMealsPerWeek: number;
  localVegMealsPerWeek: number;
  importedVegMealsPerWeek: number;
  carKmPerWeek: number;
  carIsElectric: boolean;
  publicTransportKmPerWeek: number;
  bicycleKmPerWeek: number;
  flightHoursPerYear: number;

  electricityKWhPerMonth: number;
  gasM3PerMonth: number;
  solarPanels: boolean;
  housingSize: number;
  numberOfPeopleInHouse: number;

  clothesPerMonth: number;
  electronicsPerYear: number;
  shoppingScore: number;

  recycles: boolean;
  composts: boolean;
  reusesItems: boolean;

  waterLitersPerDay: number;

  streamingHoursPerWeek: number;
  cloudStorageGB: number;
};

export default function Calculator() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<UserInput>(initialData);
  const [result, setResult] = useState<FootprintResult | null>(null);

  const handleAnswer = (value: number | boolean) => {
    const key = questions[current].key as keyof UserInput;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const result = calculateFootprint(answers);
      setResult(result);
    }
  };

  return (
    <div className="container">
      <div className="calculator-container">
        {result === null ? (
          <div className="question-container">
            <CalculatorCard
              question={questions[current].question}
              options={questions[current].options}
              onSelect={handleAnswer}
            />
          </div>
        ) : (
          <FootprintStats result={result} />
        )}
      </div>
    </div>
  );
}
