import React, { useState } from "react";
import Header from './Header';
import '../styles/AudioToIsl.css';

const AudioToISL = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [message, setMessage] = useState(""); // Used to display transcription text
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(""); // New state for video URL
  const [history, setHistory] = useState([]); // State for storing previous audio and message history

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
      const response = await fetch("http://localhost:5000/api/process-audio", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Get the error message from the server
        console.error("Error from server:", errorData.message);
        throw new Error(errorData.message || "Network response was not ok");
      }
  
      const data = await response.json();
      setMessage(data.message); // Display the extracted text in the frontend
      setVideoUrl(data.videoUrl); // Set the video URL returned by the backend
      
      // Add the current audio and message to the history
      setHistory((prevHistory) => [
        ...prevHistory,
        { audioUrl: URL.createObjectURL(audioFile), message: data.message, videoUrl: data.videoUrl }
      ]);
      
      // Clear the current audio state after processing
      setAudioFile(null);
      setAudioUrl("");
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
        {/* Display history of audio files and their transcriptions */}
        {history.length > 0 && (
          <div className="history-container">
            {history.map((entry, index) => (
              <div key={index} className="history-entry">
                <audio controls src={entry.audioUrl} className="audio-preview"></audio>
                <p className="output-text-content">{entry.message}</p>
                {entry.videoUrl && <video controls width="100%" src={entry.videoUrl}></video>}
              </div>
            ))}
          </div>
        )}

        {/* New uploaded audio and its transcription (show only the most recent one) */}
        <div className="audio-display">
          {audioUrl && (
            <audio controls src={audioUrl} className="audio-preview"></audio>
          )}
        </div>


        {/* Video Container */}
        {videoUrl && (
          <div className="video-container">
            <video controls width="100%" src={videoUrl}></video>
          </div>
        )}
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