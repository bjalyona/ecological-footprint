import '../../pages/Calculator/Calculator.css';

type PlanetDisplayProps = {
  planets: number;
};

export default function PlanetDisplay({ planets }: PlanetDisplayProps) {
  const fullPlanets = Math.floor(planets);
  const hasHalf = planets % 1 >= 0.25;

  return (
    <div >
      {[...Array(fullPlanets)].map((_, i) => (
        <img
          key={i}
          src="/planet.png"
          alt="Full planet"
          className="planet-img"
        />
      ))}
      {hasHalf && (
        <img
          src="/planet-half.png"
          alt="Half planet"
          className="planet-img"
        />
      )}
      <span>
        {planets.toFixed(2)} планет
      </span>
    </div>
  );
}
