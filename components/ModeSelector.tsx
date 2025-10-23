
import React from 'react';
import { AppMode } from '../types';

interface ModeSelectorProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const modes = [
  { id: AppMode.EDIT, label: 'Edit', icon: '🎨' },
  { id: AppMode.ANALYZE, label: 'Analyze', icon: '🔬' },
  { id: AppMode.TIME_TRAVEL, label: 'Time Travel', icon: '⏳' },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex space-x-2 bg-gray-700 p-1 rounded-lg">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`w-full text-center px-4 py-2 rounded-md font-semibold transition-colors duration-300
            ${
              currentMode === mode.id
                ? 'bg-cyan-500 text-white shadow'
                : 'bg-transparent text-gray-300 hover:bg-gray-600'
            }`}
        >
          {mode.icon} {mode.label}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
