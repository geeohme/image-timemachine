
import React from 'react';
import { HISTORICAL_SCENES } from '../constants';

interface HistoricalSceneSelectorProps {
  selectedSceneId: string;
  onSelectScene: (id: string) => void;
}

const HistoricalSceneSelector: React.FC<HistoricalSceneSelectorProps> = ({ selectedSceneId, onSelectScene }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {HISTORICAL_SCENES.map((scene) => (
        <div
          key={scene.id}
          onClick={() => onSelectScene(scene.id)}
          className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105
            ${selectedSceneId === scene.id ? 'ring-4 ring-cyan-500' : 'ring-2 ring-transparent'}`}
        >
          <img src={scene.imageUrl} alt={scene.name} className="w-full h-24 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-1">
            <span className="text-white text-xs text-center font-bold">{scene.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoricalSceneSelector;
