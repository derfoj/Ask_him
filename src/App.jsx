import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DeckCard from "./components/DeckCard";
import StudySession from "./components/StudySession";
import DeckEditor from "./components/DeckEditor";
import DeckStats from "./components/DeckStats";
import Modal from "./components/Modal";

export default function App() {
  const [decks, setDecks] = useState([]);
  const [view, setView] = useState("home");
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [showNewDeck, setShowNewDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("decks") || "[]");
    setDecks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

  const handleAddDeck = () => {
    if (!newDeckName.trim()) return;
    const newDeck = { id: Date.now(), name: newDeckName, cards: [] };
    setDecks([...decks, newDeck]);
    setNewDeckName("");
    setShowNewDeck(false);
  };

  const handleDeleteDeck = id => {
    if (window.confirm("Supprimer ce deck ?")) {
      setDecks(decks.filter(d => d.id !== id));
    }
  };

  const handleSaveDeck = updatedDeck => {
    const updated = decks.map(d => (d.id === updatedDeck.id ? updatedDeck : d));
    setDecks(updated);
    setView("home");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header title="Flashcards Anki-Like" />

      {view === "home" && (
        <div className="max-w-5xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Vos decks</h2>
            <button
              onClick={() => setShowNewDeck(true)}
              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              + Nouveau deck
            </button>
          </div>

          {decks.length === 0 ? (
            <p className="text-neutral-500">Aucun deck pour le moment.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {decks.map(deck => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onStudy={() => {
                    setSelectedDeck(deck);
                    setView("study");
                  }}
                  onEdit={() => {
                    setSelectedDeck(deck);
                    setView("edit");
                  }}
                  onStats={() => {
                    setSelectedDeck(deck);
                    setView("stats");
                  }}
                  onDelete={() => handleDeleteDeck(deck.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {view === "study" && (
        <StudySession
          deck={selectedDeck}
          onEnd={updatedCards => {
            const updatedDeck = { ...selectedDeck, cards: updatedCards };
            handleSaveDeck(updatedDeck);
          }}
        />
      )}

      {view === "edit" && (
        <DeckEditor
          deck={selectedDeck}
          onSave={handleSaveDeck}
          onBack={() => setView("home")}
        />
      )}

      {view === "stats" && (
        <DeckStats deck={selectedDeck} onBack={() => setView("home")} />
      )}

      <Modal
        isOpen={showNewDeck}
        onClose={() => setShowNewDeck(false)}
        title="Créer un nouveau deck"
      >
        <input
          type="text"
          value={newDeckName}
          onChange={e => setNewDeckName(e.target.value)}
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Nom du deck"
        />
        <button
          onClick={handleAddDeck}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
        >
          Créer
        </button>
      </Modal>
    </div>
  );
}