function isConfigured() {
  const apiKey = process.env.REACT_APP_ANALYZER_API_KEY;
  const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
  return apiKey && endpoint;
}

async function analyzeImage(imageUrl) {
  const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
  const apiKey = process.env.REACT_APP_ANALYZER_API_KEY;
  const apiUrl = `${endpoint}/vision/v3.0/analyze?visualFeatures=Description&language=en`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey,
      },
      body: JSON.stringify({
        url: imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error analyzing image:", error);
    throw error;
  }
}

export { isConfigured, analyzeImage };
