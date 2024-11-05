import React, { useState } from "react";
import Header from './Header';
import '../styles/AudioToIsl.css';

const AudioToISL = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file)); // Create a URL to preview the audio file
    setMessage("");
  };

  const handleProcess = async () => {
    if (!audioFile) {
      alert("Please upload an audio file first.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const response = await fetch("http://localhost:5000/process-audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error processing audio:", error);
      setMessage("Error connecting to server.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <p className="audio-title">Audio to ISL Converter</p>
      <div className="audio-container">
        <div className="audio-display">
          {audioUrl && (
            <audio controls src={audioUrl} className="audio-preview"></audio>
          )}
        </div>
        <div className="audio-message-output">
          {message && <p className="output-text-content">{message}</p>}
        </div>
      </div>
      <div className="upload-controls">
        <input type="file" accept="audio/*" onChange={handleFileChange} id="file-upload" />
        <label htmlFor="file-upload" className="upload-label">Choose Audio</label>
        <button onClick={handleProcess} disabled={!audioFile || isLoading} className="process-button">
          {isLoading ? 'Processing...' : 'Upload Audio'}
        </button>
      </div>
    </div>
  );
};

export default AudioToISL;