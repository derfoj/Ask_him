import React, { useState, useRef } from "react";
import { Bold, Italic, Underline, Image } from "lucide-react";

export default function RichTextEditor({ value, onChange, onImageUpload, label }) {
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const textareaRef = useRef(null);

  const applyFormatting = (prefix, suffix = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = beforeText + prefix + selectedText + suffix + afterText;
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const insertImage = () => {
    if (!imageUrl.trim()) return;
    const imageMarkdown = `![image](${imageUrl})`;
    const newText = value + (value ? "\n" : "") + imageMarkdown;
    onChange(newText);
    setImageUrl("");
    setShowImageInput(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageMarkdown = `![image](${event.target.result})`;
      const newText = value + (value ? "\n" : "") + imageMarkdown;
      onChange(newText);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">{label}</label>
      )}

      <div className="border border-neutral-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
        <div className="flex items-center gap-1 p-2 bg-neutral-50 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => applyFormatting("**")}
            className="p-1.5 hover:bg-neutral-200 rounded transition"
            title="Gras"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => applyFormatting("*")}
            className="p-1.5 hover:bg-neutral-200 rounded transition"
            title="Italique"
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onClick={() => applyFormatting("<u>", "</u>")}
            className="p-1.5 hover:bg-neutral-200 rounded transition"
            title="Souligné"
          >
            <Underline size={18} />
          </button>
          <div className="w-px h-6 bg-neutral-300 mx-1" />
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className="p-1.5 hover:bg-neutral-200 rounded transition"
            title="Insérer une image"
          >
            <Image size={18} />
          </button>
          <label className="p-1.5 hover:bg-neutral-200 rounded transition cursor-pointer" title="Télécharger une image">
            <Image size={18} className="text-primary" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {showImageInput && (
          <div className="p-2 bg-neutral-50 border-b border-neutral-200 flex gap-2">
            <input
              type="text"
              placeholder="URL de l'image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 px-2 py-1 border border-neutral-300 rounded text-sm"
              onKeyPress={(e) => e.key === 'Enter' && insertImage()}
            />
            <button
              type="button"
              onClick={insertImage}
              className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-dark"
            >
              Insérer
            </button>
            <button
              type="button"
              onClick={() => {
                setShowImageInput(false);
                setImageUrl("");
              }}
              className="px-3 py-1 bg-neutral-200 text-neutral-700 rounded text-sm hover:bg-neutral-300"
            >
              Annuler
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 focus:outline-none resize-none"
          rows="4"
        />
      </div>

      <div className="text-xs text-neutral-500">
        Formatage: **gras**, *italique*, &lt;u&gt;souligné&lt;/u&gt;, ![alt](url) pour les images
      </div>
    </div>
  );
}
