import { useState } from "react";
import CalculatorCard from "../../components/CalculatorCard/CalculatorCard";
import "./Calculator.css";
import {
  calculateFootprint,
  type FootprintResult,
} from "../../utils/calculateFootprint";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import PlanetDisplay from "./PlanetDisplay";
import { questions } from "../../utils/questions";

const COLORS = ["#84a98c", "#52796f", "#cad2c5", "#354f52"];

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
  const co2ComparisonData = result
    ? [
        { name: "Твой результат", value: result.co2KgPerYear },
        { name: "Средний результат по России", value: 4000 },
        { name: "Средний результат по миру", value: 5000 },
      ]
    : [];

  const ghaComparisonData = result
    ? [
        { name: "Твой результат", value: result.gha },
        { name: "Средний результат по России", value: 4.4 },
        { name: "Средний результат по миру", value: 2.7 },
      ]
    : [];

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

  const categoryBreakdownChartData =
  result?.breakdownByCategory
    ? Object.entries(result.breakdownByCategory).map(([name, value]) => ({
        name,
        value,
      }))
    : [];


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
          <div className="charts-grid">
            <div className="chart-container">
              <PlanetDisplay planets={result.planets} />
            </div>

            <div className="chart-container">
              <h3>Вклад разных сфер в твой углеродный след</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryBreakdownChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryBreakdownChartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="comparison-charts">
              <h3>Сравнение CO₂ (kg/year)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={co2ComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#52796f" />
                </BarChart>
              </ResponsiveContainer>

              <h3>Сравнение GHA (Глобальные гектары)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ghaComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#84a98c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
