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

interface FootprintStatsProps {
  result: FootprintResult
}

export default function FootprintStats({result}: FootprintStatsProps) {
  const COLORS = ["#84a98c", "#52796f", "#cad2c5", "#354f52"];
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

  const categoryBreakdownChartData = result?.breakdownByCategory
    ? Object.entries(result.breakdownByCategory).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
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
  );
}
