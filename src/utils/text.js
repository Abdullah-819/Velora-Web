import React from 'react';

/**
 * highlightText Utility
 * Wraps matching text in a span with a highlight class.
 * 
 * @param {string} text - The full text.
 * @param {string} highlight - The term to highlight.
 * @returns {React.ReactNode}
 */
export const highlightText = (text, highlight) => {
  if (!highlight.trim()) {
    return text;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="text-highlight">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};
