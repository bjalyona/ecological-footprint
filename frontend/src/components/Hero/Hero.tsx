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
        <h1 className="hero_header">Calculate your Ecological Footprint</h1>
        <p className="hero_description">
          Understand your carbon footprint and discover simple ways to reduce
          your impact on the planet. Small changes can make a big difference.
        </p>
        <Button onClick={handleStartClick}>Start now</Button>
      </div>
    </section>
  );
}
