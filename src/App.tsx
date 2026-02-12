import { useState, useEffect } from "react";
import "./App.css";
import {
  buildDeck,
  shuffleDeck,
  getCardImagePath,
  groupCardsBySuit,
  type Card,
  type Deck,
} from "./utils/deckUtils";

function App() {
  const [deck, setDeck] = useState<Deck>([]);
  const [cardHistory, setCardHistory] = useState<Card[]>([]);
  const [discardCard, setDiscardCard] = useState<string>("");

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newDeck = shuffleDeck(buildDeck());
    setDeck(newDeck);
    setCardHistory([]);
    setDiscardCard("");
  };

  const handleShuffle = () => {
    if (window.confirm("Are you sure you want to shuffle?")) {
      startGame();
    }
  };

  const handleDraw = () => {
    if (deck.length === 0) {
      alert("No more cards in deck!");
      return;
    }

    const newDeck = [...deck];
    const drawnCard = newDeck.pop()!;

    setDeck(newDeck);
    setDiscardCard(getCardImagePath(drawnCard));
    setCardHistory((prev) => [...prev, drawnCard].sort());
  };

  return (
    <>
      <div id="parent" className="parent">
        <div id="game" className="game">
          <div id="card-history" className="card-history">
            {["♠", "♣", "♥", "♦"].map((suit) => {
              const suitCards = groupCardsBySuit(cardHistory)[suit] || [];
              return (
                <div key={suit} className="suit-row">
                  <span
                    className={`suit-label ${suit === "♥" || suit === "♦" ? "red" : "black"}`}
                  >
                    {suit}
                  </span>
                  {suitCards.map((card, index) => (
                    <img
                      key={`${card}-${index}`}
                      src={getCardImagePath(card)}
                      alt={card}
                      className="history-card"
                    />
                  ))}
                </div>
              );
            })}
          </div>
          <div id="all-cards" className="all-cards">
            <div id="deck" className="deck">
              {deck.length > 0 && (
                <img
                  id="hidden"
                  src="./images/cards_suit_first/BACK.png"
                  alt="Card back"
                />
              )}
            </div>
            <div id="discard" className="deck">
              {discardCard && (
                <img id="discard-card" src={discardCard} alt="Discard card" />
              )}
            </div>
          </div>
          <div id="buttons" className="card-buttons">
            <button id="draw" className="draw" onClick={handleDraw}>
              Draw
            </button>
            <button id="shuffle" className="shuffle" onClick={handleShuffle}>
              Shuffle
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
