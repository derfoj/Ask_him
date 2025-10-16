import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function StudySession({ deck, onEnd }) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Charger uniquement les cartes à étudier
    const due = deck.cards.filter(c => new Date(c.nextReview) <= new Date());
    setCards(due);
  }, [deck]);

  const current = cards[index];

  const handleAnswer = difficulty => {
    const now = new Date();
    let interval = current.interval;
    let ease = current.ease;

    if (difficulty === "easy") {
      interval = interval === 0 ? 1 : interval * 2;
      ease += 0.1;
    } else if (difficulty === "medium") {
      interval = Math.max(1, interval * 1.5);
    } else {
      interval = 1;
      ease = Math.max(1.3, ease - 0.1);
    }

    current.interval = interval;
    current.ease = ease;
    current.reps += 1;
    current.nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    const updatedCards = [...cards];
    updatedCards[index] = current;
    setCards(updatedCards);

    if (index < cards.length - 1) {
      setIndex(index + 1);
      setShowBack(false);
    } else {
      onEnd(updatedCards);
    }
  };

  if (cards.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">Aucune carte à étudier pour le moment 📚</p>
        <button
          onClick={onEnd}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
      <button onClick={onEnd} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft size={18} className="mr-1" /> Quitter
      </button>

      <div className="text-center">
        <h2 className="text-lg text-gray-500 mb-2">
          Carte {index + 1} / {cards.length}
        </h2>
        <div
          className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition"
          onClick={() => setShowBack(!showBack)}
        >
          <p className="text-xl text-gray-800">
            {showBack ? current.back : current.front}
          </p>
        </div>
      </div>

      {showBack && (
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => handleAnswer("hard")}
            className="flex-1 bg-red-100 text-red-700 rounded-lg py-2 hover:bg-red-200"
          >
            Difficile
          </button>
          <button
            onClick={() => handleAnswer("medium")}
            className="flex-1 bg-yellow-100 text-yellow-700 rounded-lg py-2 hover:bg-yellow-200"
          >
            Moyen
          </button>
          <button
            onClick={() => handleAnswer("easy")}
            className="flex-1 bg-green-100 text-green-700 rounded-lg py-2 hover:bg-green-200"
          >
            Facile
          </button>
        </div>
      )}
    </div>
  );
}
