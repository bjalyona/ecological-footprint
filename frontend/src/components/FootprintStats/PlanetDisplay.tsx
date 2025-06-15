import '../../pages/Calculator/Calculator.css';
import './FootprintStats.css'

type PlanetDisplayProps = {
  planets: number;
};

export default function PlanetDisplay({ planets }: PlanetDisplayProps) {
  const fullPlanets = Math.floor(planets);
  const hasHalf = planets % 1 >= 0.25;

  return (
    <div >
      <div className="planets-container">
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
      </div>
      <br />
      <span className="stats-descr">
        - <b className='text-bigger'>{planets.toFixed(2)} наших планет</b> потребуется, если все люди будут потреблять так же, как и вы
      </span>
    </div>
  );
}
