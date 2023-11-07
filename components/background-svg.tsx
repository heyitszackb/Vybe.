import React from 'react';

const BackgroundSVG = () => {
  return (
    <svg className="fixed inset-0 w-full h-full opacity-5 pointer-events-none z-[-1]">
      <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
        <circle id="pattern-circle" cx="0.9" cy="0.9" r="1.6257413380501518" fill="#000"></circle>
      </pattern>
      <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
    </svg>
  );
}

export default BackgroundSVG;