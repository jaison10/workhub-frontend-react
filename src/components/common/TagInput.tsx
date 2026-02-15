import React, { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

/**
 * TagInput - Component for adding/removing tags (skills, interests, etc.)
 *
 * Features:
 * - Type and press Enter to add tags
 * - Click X to remove tags
 * - Optional suggestions list
 * - Prevents duplicates
 */
export const TagInput: React.FC<TagInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Type and press Enter',
  suggestions = []
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const addSuggestion = (suggestion: string) => {
    if (!value.includes(suggestion)) {
      onChange([...value, suggestion]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
        {/* Tags Display */}
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={placeholder}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1.5">Suggestions:</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions
              .filter(s => !value.includes(s))
              .map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addSuggestion(suggestion)}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  + {suggestion}
                </button>
              ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-1.5">
        Press Enter or click away to add. Click X to remove.
      </p>
    </div>
  );
};
