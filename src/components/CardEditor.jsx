import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

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
      <RichTextEditor
        label="Question"
        value={front}
        onChange={setFront}
      />
      <RichTextEditor
        label="Réponse"
        value={back}
        onChange={setBack}
      />
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
