import React, { useState } from "react";
import Header from './Header';
import '../styles/WordToText.css';

const WordToText = () => {
  // State to keep a history of uploads with images and texts
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a new upload entry with the file and empty text
      const newUpload = { imageFile: file, outputText: '' };
      setUploads([...uploads, newUpload]);
    }
  };

  // Send image to Flask backend for text extraction
  const processImage = async (file, index) => {
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/process-word-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Update the specific upload's outputText after processing
        setUploads(prevUploads =>
          prevUploads.map((upload, idx) =>
            idx === index ? { ...upload, outputText: data.text } : upload
          )
        );
      } else {
        setUploads(prevUploads =>
          prevUploads.map((upload, idx) =>
            idx === index ? { ...upload, outputText: 'Error processing image.' } : upload
          )
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setUploads(prevUploads =>
        prevUploads.map((upload, idx) =>
          idx === index ? { ...upload, outputText: 'Error connecting to server.' } : upload
        )
      );
    }
    setIsLoading(false);
  };

  // Trigger image processing for the latest upload when added
  const handleProcessLatestImage = () => {
    const latestUploadIndex = uploads.length - 1;
    const latestUpload = uploads[latestUploadIndex];

    if (latestUpload && latestUpload.imageFile) {
      processImage(latestUpload.imageFile, latestUploadIndex);
    }
  };

  return (
    <div>
      <Header />
      <p className="WordToText-title">Word To Text Converter</p>
      <div className="WordToText-container">
        {/* Map through each upload and display the image and text */}
        {uploads.map((upload, index) => (
          <div key={index} className="WordToText-item">
            <div className="WordToText-display">
              <img
                src={URL.createObjectURL(upload.imageFile)}
                alt={`Uploaded ${index}`}
                className="WordToText-image-preview"
              />
            </div>
            <div className="WordToText-text-output">
              {/* Only show outputText when it is not empty */}
              {upload.outputText && (
                <p className="WordToText-output-text-content">  {upload.outputText}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="WordToText-upload-controls">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          id="WordToText-image-upload"
        />
        <label htmlFor="WordToText-image-upload" className="WordToText-upload-label">Choose Image</label>
        <button 
          onClick={handleProcessLatestImage} 
          disabled={uploads.length === 0 || isLoading} 
          className="WordToText-process-button"
        >
          {isLoading ? 'Processing...' : 'Convert to Text'}
        </button>
      </div>
    </div>
  );
};

export default WordToText;
