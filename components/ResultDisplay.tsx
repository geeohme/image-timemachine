
import React, { useState } from 'react';
import { GeneratedContent } from '../types';
import Spinner from './Spinner';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedContent: GeneratedContent | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedContent, isLoading, error }) => {
  const [isLargeDisplayVisible, setIsLargeDisplayVisible] = useState(false);
  const [downloadQuality, setDownloadQuality] = useState(85);

  const handleDownload = () => {
    if (!generatedContent || generatedContent.type !== 'image') return;

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        const link = document.createElement('a');
        link.download = 'gemini-time-machine-result.jpg';
        link.href = canvas.toDataURL('image/jpeg', downloadQuality / 100);
        link.click();
      }
    };
    image.src = generatedContent.data;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Spinner />
          <p className="mt-4 text-lg text-cyan-400">Gemini is thinking...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      );
    }
    
    if (!originalImage) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold">Waiting for generation...</h3>
                <p>Your results will appear here.</p>
            </div>
        );
    }
    
    if (!generatedContent) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <h3 className="text-xl font-semibold">Ready to Generate</h3>
                <p>Your result will be shown here.</p>
            </div>
        );
    }

    return (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold mb-2 text-cyan-400 text-center">Result</h3>
        <div className="w-full flex-grow bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center p-2 min-h-[300px]">
            {generatedContent.type === 'image' ? (
                <img src={generatedContent.data} alt="Generated" className="max-w-full max-h-full object-contain" />
            ) : (
                <p className="text-gray-200 whitespace-pre-wrap p-4">{generatedContent.data}</p>
            )}
        </div>
        {generatedContent.type === 'image' && (
           <div className="w-full mt-4 space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => setIsLargeDisplayVisible(true)}
                  className="py-2 px-4 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors duration-200"
                >
                  🖼️ Display Large
                </button>
                <button 
                  onClick={handleDownload}
                  className="py-2 px-4 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors duration-200"
                >
                  💾 Download JPG
                </button>
            </div>
            <div className="flex items-center gap-3">
                <label htmlFor="quality" className="text-sm font-medium text-gray-300 whitespace-nowrap">JPG Quality:</label>
                <input
                    id="quality"
                    type="range"
                    min="1"
                    max="100"
                    value={downloadQuality}
                    onChange={(e) => setDownloadQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    aria-label="JPG download quality"
                />
                <span className="text-sm font-bold text-cyan-400 w-10 text-center">{downloadQuality}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full min-h-[400px] lg:min-h-0">{renderContent()}</div>
      {isLargeDisplayVisible && generatedContent?.type === 'image' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsLargeDisplayVisible(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Large image view"
        >
          <img 
            src={generatedContent.data} 
            alt="Generated Large" 
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent image click from closing modal
          />
          <button
            onClick={() => setIsLargeDisplayVisible(false)}
            className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
            aria-label="Close large image view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default ResultDisplay;
