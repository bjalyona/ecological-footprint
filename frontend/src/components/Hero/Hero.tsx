import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/calculator");
  };

  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero_header">Рассчитайте свой Экологический След</h1>
        <p className="hero_description">
          Узнайте степень вашего воздействия на окружающую среду и то, как вы
          можете помочь нашей планете. Небольшие изменения ведут к большим
          переменам.
        </p>
        <Button onClick={handleStartClick}>Начать сейчас</Button>
        
      </div>
    </section>
  );
}
