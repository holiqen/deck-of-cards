import React from "react";
import "./Card.css";

const Card = ({ image, name }) => {
  const angle = Math.random() * 90 - 45;
  const xPos = Math.random() * 40 - 20;
  const yPos = Math.random() * 40 - 20;
  const _transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

  return <img className="Card" style={{ transform: _transform }} src={image} alt={name} />;
};

export default Card;
