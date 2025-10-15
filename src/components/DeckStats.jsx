import React from "react";
import { ArrowLeft } from "lucide-react";

export default function DeckStats({ deck, onBack }) {
  const total = deck.cards.length;
  const toStudy = deck.cards.filter(c => new Date(c.nextReview) <= new Date()).length;
  const easy = deck.cards.filter(c => c.ease > 2.5).length;
  const hard = deck.cards.filter(c => c.ease <= 2.0).length;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft size={18} className="mr-1" /> Retour
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">{deck.name} — Statistiques</h2>

      <div className="space-y-3">
        <p className="text-gray-700">📚 Total de cartes : <strong>{total}</strong></p>
        <p className="text-gray-700">🔥 À étudier aujourd’hui : <strong>{toStudy}</strong></p>
        <p className="text-gray-700">😎 Faciles : <strong>{easy}</strong></p>
        <p className="text-gray-700">💀 Difficiles : <strong>{hard}</strong></p>
      </div>

      <div className="mt-6">
        <progress value={toStudy} max={total} className="w-full" />
        <p className="text-sm text-gray-500 mt-1 text-center">Progression du jour</p>
      </div>
    </div>
  );
}
