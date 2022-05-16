import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
      setDeck(deck.data);
    };

    fetchData();
  }, []);

  const getCard = async () => {
    const deck_id = deck.deck_id;

    try {
      const cardRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);
      if (!cardRes.data.success) {
        throw new Error("No card remaining!");
      }
      const card = cardRes.data.cards[0];

      setDrawn((prevDrawn) => [
        ...prevDrawn,
        { id: card.code, image: card.image, name: `${card.value} of ${card.suit}` },
      ]);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="Deck">
      <h1 className="Deck-title">♦ Card Dealer ♦</h1>
      <h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
      <button className="Deck-btn" onClick={getCard}>
        Get Card!
      </button>
      <div className="Deck-card-area">
        {drawn.map((card) => {
          return <Card key={card.id} name={card.name} image={card.image} />;
        })}
      </div>
    </div>
  );
};

export default Deck;
