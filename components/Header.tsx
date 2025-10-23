
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 text-center border-b border-gray-700">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Gemini Image Time Machine
      </h1>
      <p className="text-gray-400 mt-1">Analyze, Edit, and Transform Your Photos with AI</p>
    </header>
  );
};

export default Header;
