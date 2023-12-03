import React, { useState } from 'react';
import * as ImageAnalysis from './azure-image-analysis';
// import * as ImageGeneration from './azure-image-generation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [isConfiguredMessage, setIsConfiguredMessage] = useState(false);

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleAnalyzeClick = async () => {
    setIsLoading(true);
    try {
      const analyzedResult = await ImageAnalysis.analyzeImage(input);
      setResult(analyzedResult);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      // const generatedResult = await ImageGeneration.generateImage(input);
      // setResult(generatedResult[0]);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const displayResult = () => {
    if (!result) return null;
    return (
      <div>
        <p class="fs-3 text-semi-bold text-danger">Analysis Result</p>
        <img width="400" src={result?.url ? result.url : input} alt="analyzed" className='img-fluid'/>
        {/* <pre> {JSON.stringify(result, null, 2)} </pre> */}
        <p className='lead text-start '>Description:
          <small class="text-body-secondary"> {result.description.captions[0].text}</small>
        </p>
        <p className='lead text-start'>Confidence:
          <small class="text-body-secondary"> {result.description.captions[0].confidence}</small>
        </p>
        <p className='lead text-start'>Tags:
          <small class="text-body-secondary"> {result.description.tags.join(', ')}</small>
        </p>
      </div>
    );
  };

  // Check if Azure AI services are configured
  // const azureImageGenerationConfigured = ImageGeneration.isConfigured();
  // const azureImageAnalysisConfigured = ImageAnalysis.isConfigured();

  // if (!azureImageGenerationConfigured || !azureImageAnalysisConfigured) {
  //   return (
  //     <div className="App">
  //       <div className="container mt-5">
  //         <p className='text-danger text-center fs-1 fw-bold'>Warning: The app isn't properly configured for Azure AI services.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <div className="container">
          <header className="d-flex justify-content-center py-3">
            <a href="/" class="d-flex align-items-center link-body-emphasis text-decoration-none">
              <h1 className="display-5 fw-bold text-info">Image Analyzer & Generator</h1>
            </a>
          </header>
      </div>
      <p className="fs-5 mb-4 text-center">A smart web application that integrates computer vision capabilities, leveraging Azure AI Vision and Azure OpenAI cognitive services.</p>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="bg-dark text-secondary px-4 py-5 text-center">
              <div className="py-5">
                <div className="mx-auto">
                  <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                      <label htmlFor='image-url' className="form-label">Insert URL or type prompt</label>
                      <input
                        type="text"
                        id="image-url"
                        name="image-url"
                        value={input}
                        onChange={handleOnChange}
                        className="form-control"
                        placeholder="Enter URL to analyze or textual prompt to generate an image"
                        aria-label="Search"
                        />
                    </div>
                    <button
                      type="button"
                      onClick={handleAnalyzeClick}
                      className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                      disabled={isLoading || input.trim() === ''}
                      >
                        {isLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                      onClick={handleGenerateClick}
                      >
                        Generate
                    </button>
                    {/* If 'Generate' button functionality is different, handleOnClick can be different */}
                    {/* <button type="button" onClick={handleGenerateClick}>Generate</button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            {isLoading ? <p>Loading...</p> : displayResult()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
