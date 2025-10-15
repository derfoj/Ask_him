import React from "react";
import { Trash2, Play, Edit2, BarChart3 } from "lucide-react";

export default function DeckCard({ deck, onStudy, onEdit, onStats, onDelete }) {
  const cardsToStudy = deck.cards.filter(c => new Date(c.nextReview) <= new Date()).length;

  return (
    <div className="bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-800">{deck.name}</h3>
          <p className="text-sm text-neutral-500 mt-1">
            {deck.cards.length} cartes •{" "}
            <span className="font-medium text-primary">{cardsToStudy} à étudier</span>
          </p>
        </div>
        <button
          onClick={onDelete}
          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onStudy}
          disabled={cardsToStudy === 0}
          className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-neutral-300 disabled:cursor-not-allowed transition"
        >
          <Play size={16} className="inline mr-1" /> Étudier
        </button>
        <button
          className="px-3 py-1.5 text-sm font-medium bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition"
        >
          <Edit2 size={16} className="inline mr-1" /> Éditer
        </button>
        <button
          onClick={onStats}
          className="px-3 py-1.5 text-sm font-medium bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition"
        >
          <BarChart3 size={16} className="inline mr-1" /> Stats
        </button>
      </div>
    </div>
  );
}
