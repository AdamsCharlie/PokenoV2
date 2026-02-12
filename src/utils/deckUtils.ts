export type Card = string;
export type Deck = Card[];

export function buildDeck(): Deck {
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const suits = ["♠", "♣", "♥", "♦"];
  const deck: Deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(suits[i] + values[j]);
    }
  }

  console.log("Built deck with", deck.length, "cards");
  return deck;
}

export function shuffleDeck(deck: Deck): Deck {
  const shuffledDeck = [...deck];

  for (let i = 0; i < shuffledDeck.length; i++) {
    const j = Math.floor(Math.random() * shuffledDeck.length);
    const temp = shuffledDeck[i];
    shuffledDeck[i] = shuffledDeck[j];
    shuffledDeck[j] = temp;
  }

  return shuffledDeck;
}

export function getCardImagePath(card: Card): string {
  return `./images/cards_suit_first/${card}.png`;
}

export function groupCardsBySuit(cards: Card[]): Record<string, Card[]> {
  const suits = ["♠", "♣", "♥", "♦"];
  const grouped: Record<string, Card[]> = {};

  suits.forEach((suit) => {
    grouped[suit] = [];
  });

  cards.forEach((card) => {
    const suit = card.charAt(0);
    if (grouped[suit]) {
      grouped[suit].push(card);
    }
  });

  const valueOrder = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  suits.forEach((suit) => {
    grouped[suit].sort((a, b) => {
      const valueA = a.slice(1);
      const valueB = b.slice(1);
      return valueOrder.indexOf(valueA) - valueOrder.indexOf(valueB);
    });
  });

  return grouped;
}
