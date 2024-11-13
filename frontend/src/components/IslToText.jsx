import React, { useState } from "react";
import Header from './Header';
import '../styles/IslToText.css'; 

const ISLToText = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setOutputText('');  
    }
  };

  // Send video to Flask backend
  const processVideo = async () => {
    if (!videoFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://localhost:5000/api/process-video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setOutputText(data.result);
      } else {
        setOutputText('Error processing video.');
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
      <p className="video-title">Video To Text Converter</p>
      <div className="video-container">
        
        <div className="video-display">
          {videoFile && (
            <video controls src={URL.createObjectURL(videoFile)} className="video-preview" />
          )}
        </div>
        
        <div className="video-text-output">
          {outputText && <p className="output-text-content">{outputText}</p>}
        </div>
        
      </div>
      <div className="upload-controls">
          <input type="file" accept="video/*" onChange={handleVideoUpload} id="file-upload" />
          <label htmlFor="file-upload" className="upload-label">Choose Video</label>
          <button onClick={processVideo} disabled={!videoFile || isLoading} className="process-button">
            {isLoading ? 'Processing...' : 'Upload Video'}
          </button>
      </div>

    </div>
  );
};

export default ISLToText;