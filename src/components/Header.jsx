import React from "react";
import { ArrowLeft } from "lucide-react";

export default function Header({ title, onBack }) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-600"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
      </div>
    </div>
  );
}
