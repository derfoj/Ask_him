import React, { useState } from "react";
import CardEditor from "./CardEditor";
import CSVImporter from "./CSVImporter";
import { ArrowLeft, Trash2, Upload } from "lucide-react";

export default function DeckEditor({ deck, onSave, onBack }) {
  const [cards, setCards] = useState(deck.cards);
  const [editingCard, setEditingCard] = useState(null);
  const [importing, setImporting] = useState(false);

  const handleSaveCard = (front, back) => {
    if (editingCard) {
      const updated = cards.map(c =>
        c.id === editingCard.id ? { ...c, front, back } : c
      );
      setCards(updated);
      setEditingCard(null);
    } else {
      const newCard = {
        id: Date.now(),
        front,
        back,
        interval: 0,
        nextReview: new Date().toISOString(),
        ease: 2.5,
        reps: 0,
      };
      setCards([...cards, newCard]);
    }
  };

  const handleDeleteCard = id => {
    if (window.confirm("Supprimer cette carte ?")) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  const handleImport = importedCards => {
    setCards([...cards, ...importedCards]);
    setImporting(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
      <button onClick={onBack} className="flex items-center text-neutral-500 hover:text-neutral-700 mb-4">
        <ArrowLeft size={18} className="mr-1" /> Retour
      </button>

      <h2 className="text-2xl font-semibold text-neutral-800 mb-4">{deck.name}</h2>

      {importing ? (
        <CSVImporter onImport={handleImport} onCancel={() => setImporting(false)} />
      ) : editingCard ? (
        <CardEditor
          card={editingCard}
          onSave={handleSaveCard}
          onCancel={() => setEditingCard(null)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-neutral-700">Cartes</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingCard({})}
                className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                + Nouvelle carte
              </button>
              <button
                onClick={() => setImporting(true)}
                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200"
              >
                <Upload size={18} />
              </button>
            </div>
          </div>

          {cards.length === 0 ? (
            <p className="text-neutral-500 text-center py-6">Aucune carte pour l’instant</p>
          ) : (
            <ul className="space-y-2">
              {cards.map(card => (
                <li key={card.id} className="flex justify-between items-center border border-neutral-200 p-2 rounded-lg">
                  <div>
                    <p className="font-medium">{card.front}</p>
                    <p className="text-neutral-500 text-sm">{card.back}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCard(card)}
                      className="text-primary hover:underline text-sm"
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-red-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => onSave({ ...deck, cards })}
            className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
          >
            Enregistrer le deck
          </button>
        </>
      )}
    </div>
  );
}
