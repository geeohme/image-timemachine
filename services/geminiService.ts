export const generateContentWithGemini = async (
  prompt: string,
  imageDataUrl: string,
  imageMimeType: string,
  shouldGenerateImage: boolean
): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        imageDataUrl,
        imageMimeType,
        shouldGenerateImage,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error calling backend for content generation:", error);
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return "An unknown error occurred while communicating with the server.";
  }
};

export const generatePromptForCustomScene = async (
  shortDescription: string
): Promise<string> => {
  try {
    const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shortDescription }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.prompt;
  } catch (error) {
    console.error("Error calling backend for prompt generation:", error);
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return "An unknown error occurred while generating the prompt.";
  }
};
