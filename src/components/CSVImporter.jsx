import React from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react";

export default function CSVImporter({ onImport, onCancel }) {
  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: results => {
        const cards = results.data
          .filter(row => row.length >= 2 && row[0] && row[1])
          .map(row => ({
            id: Date.now() + Math.random(),
            front: row[0].trim(),
            back: row[1].trim(),
            interval: 0,
            nextReview: new Date().toISOString(),
            ease: 2.5,
            reps: 0,
            difficulty: "new",
          }));

        if (cards.length === 0) return alert("Aucune carte trouvée");
        onImport(cards);
      },
      error: () => alert("Erreur de parsing CSV"),
    });
  };

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-6 cursor-pointer hover:border-neutral-400">
        <Upload size={24} className="text-neutral-400 mb-2" />
        <span className="text-sm text-neutral-600">Importer un fichier CSV</span>
        <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
      </label>
      <button onClick={onCancel} className="w-full bg-neutral-100 text-neutral-700 rounded-lg py-2 hover:bg-neutral-200">
        Annuler
      </button>
    </div>
  );
}
