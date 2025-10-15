import React, { useState } from "react";

export default function CardEditor({ card, onSave, onCancel }) {
  const [front, setFront] = useState(card?.front || "");
  const [back, setBack] = useState(card?.back || "");

  const handleSave = () => {
    if (!front.trim() || !back.trim()) {
      alert("Veuillez remplir les deux champs");
      return;
    }
    onSave(front, back);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="front" className="block text-sm font-medium text-neutral-700 mb-2">Question</label>
        <textarea
          id="front"
          value={front}
          onChange={e => setFront(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          rows="3"
        />
      </div>
      <div>
        <label htmlFor="back" className="block text-sm font-medium text-neutral-700 mb-2">Réponse</label>
        <textarea
          id="back"
          value={back}
          onChange={e => setBack(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          rows="3"
        />
      </div>
      <div className="flex gap-2">
        <button onClick={handleSave} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
          {card ? "Mettre à jour" : "Ajouter"}
        </button>
        <button onClick={onCancel} className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200">
          Annuler
        </button>
      </div>
    </div>
  );
}
