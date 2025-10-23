import React, { useState, useCallback } from 'react';
import { AppMode, GeneratedContent } from './types';
import { HISTORICAL_SCENES } from './constants';
import { generateContentWithGemini, generatePromptForCustomScene } from './services/geminiService';

import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import ImageUploader from './components/ImageUploader';
import HistoricalSceneSelector from './components/HistoricalSceneSelector';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.EDIT);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageMimeType, setOriginalImageMimeType] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSceneId, setSelectedSceneId] = useState<string>(HISTORICAL_SCENES[0].id);
  const [customSceneInput, setCustomSceneInput] = useState<string>('');

  const handleImageUpload = (dataUrl: string, mimeType: string) => {
    setOriginalImage(dataUrl);
    setOriginalImageMimeType(mimeType);
    setGeneratedContent(null);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !originalImageMimeType) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    let finalPrompt = '';
    let shouldGenerateImage = true;

    switch (mode) {
      case AppMode.EDIT:
        if (!prompt.trim()) {
          setError('Please enter an editing prompt.');
          setIsLoading(false);
          return;
        }
        finalPrompt = prompt;
        break;
      case AppMode.ANALYZE:
        finalPrompt = prompt.trim() ? prompt : 'Describe this image in detail.';
        shouldGenerateImage = false;
        break;
      case AppMode.TIME_TRAVEL:
        if (selectedSceneId === 'custom') {
            const words = customSceneInput.trim().split(/\s+/).filter(Boolean);
            if (words.length === 0 || words.length > 5) {
              setError('Please describe your custom scene in 1 to 5 words.');
              setIsLoading(false);
              return;
            }
            const detailedPrompt = await generatePromptForCustomScene(customSceneInput);
            if (detailedPrompt.startsWith('Error:')) {
              setError(`Failed to create a prompt for your scene. ${detailedPrompt}`);
              setIsLoading(false);
              return;
            }
            finalPrompt = detailedPrompt;
        } else {
            const scene = HISTORICAL_SCENES.find((s) => s.id === selectedSceneId);
            if (!scene) {
                setError('Invalid historical scene selected.');
                setIsLoading(false);
                return;
            }
            finalPrompt = scene.prompt;
        }
        break;
    }

    const result = await generateContentWithGemini(
      finalPrompt,
      originalImage,
      originalImageMimeType,
      shouldGenerateImage
    );

    if (result.startsWith('Error:')) {
      setError(result);
    } else {
      setGeneratedContent({
        type: shouldGenerateImage ? 'image' : 'text',
        data: result,
      });
    }

    setIsLoading(false);
  }, [originalImage, originalImageMimeType, mode, prompt, selectedSceneId, customSceneInput]);
  
  const getPromptPlaceholder = () => {
    switch(mode) {
      case AppMode.EDIT:
        return 'e.g., Add a retro filter...';
      case AppMode.ANALYZE:
        return 'e.g., What is the main subject of this image? (Optional)';
      case AppMode.TIME_TRAVEL:
        return 'The prompt is set by the selected scene.';
      default:
        return '';
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="flex flex-col space-y-6 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-3">1. Choose Your Mode</h2>
              <ModeSelector currentMode={mode} onModeChange={setMode} />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-3">2. Upload Your Image</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            
            {mode === AppMode.TIME_TRAVEL && (
              <>
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-3">3. Select a Scene</h2>
                  <HistoricalSceneSelector
                    selectedSceneId={selectedSceneId}
                    onSelectScene={setSelectedSceneId}
                  />
                </div>
                {selectedSceneId === 'custom' && (
                   <div>
                    <h2 className="text-xl font-bold text-cyan-400 mb-3">3a. Describe Your Scene</h2>
                    <input
                      type="text"
                      value={customSceneInput}
                      onChange={(e) => setCustomSceneInput(e.target.value)}
                      placeholder="e.g., Knight fighting a dragon (5 words max)"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200"
                    />
                  </div>
                )}
              </>
            )}

            {(mode === AppMode.EDIT || mode === AppMode.ANALYZE) && (
              <div>
                <h2 className="text-xl font-bold text-cyan-400 mb-3">
                  {mode === AppMode.EDIT ? '3. Describe Your Edit' : '3. Ask a Question'}
                </h2>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={getPromptPlaceholder()}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200 h-24"
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !originalImage}
              className="w-full py-3 px-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isLoading ? 'Generating...' : '✨ Generate'}
            </button>
          </div>

          {/* Right Column: Results */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <ResultDisplay
              originalImage={originalImage}
              generatedContent={generatedContent}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
