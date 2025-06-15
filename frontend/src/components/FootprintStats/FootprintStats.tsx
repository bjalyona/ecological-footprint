import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PlanetDisplay from "./PlanetDisplay";
import type { FootprintResult } from "../../utils/calculateFootprint";
import "./FootprintStats.css";

interface FootprintStatsProps {
  result: FootprintResult;
}

export default function FootprintStats({ result }: FootprintStatsProps) {
  const COLORS = ["#708238", "#6a7f56", "#a8b79f", "#4a4a4a", "#c0c0c0"];
  const co2ComparisonData = result
    ? [
        { name: "Ваш результат", value: result.co2KgPerYear },
        { name: "Средний результат по России", value: 4000 },
        { name: "Средний результат по миру", value: 5000 },
      ]
    : [];

  const ghaComparisonData = result
    ? [
        { name: "Ваш результат", value: result.gha },
        { name: "Средний результат по России", value: 4.4 },
        { name: "Средний результат по миру", value: 2.7 },
      ]
    : [];

  const categoryBreakdownChartData = result?.breakdownByCategory
    ? Object.entries(result.breakdownByCategory).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <div className="stats-container">
      <div className="container">
        <h2 className="stats-result">
          Ваш экологический след в глобальных гектарах -{" "}
          <span className="green-text">{result.gha}</span>
        </h2>
        <p className="stats-descr">
          Именно столько территории требуется для производства ресурсов, <br />
          которые вы потребляете
        </p>
        <p className="stats-descr">
          Если представить эту территорию в <b>планетах</b>, то получится:
        </p>
        <div className="charts-grid">
          <div className="chart-container">
            <PlanetDisplay planets={result.planets} />
          </div>
          <h2 className="stats-result">
            Ваш углеродный след составляет{" "}
            <span className="green-text">{result.co2KgPerYear} кг/год</span>
          </h2>
          <div className="chart-container">
            <div className="pie-chart-container">
              <h3>Вклад разных сфер <br />в ваш углеродный след:</h3>
              <ResponsiveContainer height={500}>
                <PieChart>
                  <Pie
                    data={categoryBreakdownChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
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
          </div>

          <div className="comparison-charts">
            <div className="comparison-chart">
              <h3>Сравнение CO₂ (kg/year)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={co2ComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#a8b79f" />
              </BarChart>
            </ResponsiveContainer>
            </div>

            <div className="comparison-chart">
              <h3>Сравнение GHA (Глобальные гектары)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={ghaComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6a7f56" />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
