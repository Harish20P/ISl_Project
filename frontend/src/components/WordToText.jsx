import React, { useState } from "react";
import Header from './Header';
import '../styles/WordToText.css';

const WordToText = () => {
  const [imageFile, setImageFile] = useState(null);
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setOutputText('');  // Clear previous output
    }
  };

  // Send image to Flask backend for text extraction
  const processImage = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/process-word-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setOutputText(data.text);  // Assuming the result contains the extracted text
      } else {
        setOutputText('Error processing image.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOutputText('Error connecting to server.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <p className="word-title">Word To Text Converter</p>
      <div className="word-container">
        
        <div className="word-display">
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              className="image-preview"
            />
          )}
        </div>
        
        <div className="word-text-output">
          {outputText && <p className="output-text-content">{outputText}</p>}
        </div>
        
      </div>
      <div className="upload-controls">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          id="word-image-upload"
        />
        <label htmlFor="word-image-upload" className="upload-label">Choose Image</label>
        <button 
          onClick={processImage} 
          disabled={!imageFile || isLoading} 
          className="process-button"
        >
          {isLoading ? 'Processing...' : 'Convert to Text'}
        </button>
      </div>
    </div>
  );
};

export default WordToText;