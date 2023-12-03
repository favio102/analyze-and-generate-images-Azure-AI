function isConfigured() {
  const apiKey = process.env.REACT_APP_API_IMG_KEY;
  const apiBase = process.env.REACT_APP_API_BASE;
  return apiKey && apiBase;
}

async function generateImage(prompt) {
  // const apiBase = process.env.REACT_APP_API_BASE;
  // const apiVersion = process.env.REACT_APP_API_VERSION
  const apiUrl = "https://images-generator.openai.azure.com/openai/deployments/Dalle3/images/generations?api-version=2023-06-01-preview";
  const apiKey = process.env.REACT_APP_API_GEN_KEY;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  const body = {
    prompt: prompt,
    n: 1,
    model: "dall-e-3"
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error : ${response.status} - ${errorMessage}}`);
    }

    const json = await response.json();
    const imageUrl = json.data[0].url;

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

export { isConfigured, generateImage };
