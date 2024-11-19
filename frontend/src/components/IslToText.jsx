import React, { useState } from "react";  
import Header from './Header';  
import '../styles/IslToText.css';   

const ISLToText = () => {  
  const [videoFiles, setVideoFiles] = useState([]);  // Array of video objects and their corresponding output  
  const [isLoading, setIsLoading] = useState(false);  

  const handleVideoUpload = (e) => {  
    const files = Array.from(e.target.files);  
    const previousVideos = [...videoFiles];  

    // Initialize the new video entries with empty output  
    const newVideos = files.map(file => ({ file, outputText: '' }));  
    
    setVideoFiles([...previousVideos, ...newVideos]);  
  };  

  const processVideo = async (videoEntry) => {  
    if (!videoEntry.file) return;  

    setIsLoading(true);  
    const formData = new FormData();  
    formData.append('video', videoEntry.file);  

    try {  
      const response = await fetch('http://localhost:5000/api/process-video', {  
        method: 'POST',  
        body: formData,  
      });  

      if (response.ok) {  
        const data = await response.json();  
        // Update the corresponding entry's output text  
        setVideoFiles(prevFiles =>   
          prevFiles.map((entry, index) =>   
            index === videoEntry.index ? { ...entry, outputText: data.result } : entry  
          )  
        );  
      } else {  
        setVideoFiles(prevFiles =>   
          prevFiles.map((entry, index) =>   
            index === videoEntry.index ? { ...entry, outputText: 'Error processing video.' } : entry  
          )  
        );  
      }  
    } catch (error) {  
      console.error('Error:', error);  
      setVideoFiles(prevFiles =>   
        prevFiles.map((entry, index) =>   
          index === videoEntry.index ? { ...entry, outputText: 'Error connecting to server.' } : entry  
        )  
      );  
    }  
    setIsLoading(false);  
  };  

  const processAllVideos = () => {  
    videoFiles.forEach((file, index) => processVideo({ ...file, index }));  
  };  

  return (  
    <div>  
      <Header />  
      <p className="isltotext-video-title">Video To Text Converter</p>  
      <div className="isltotext-video-container">  
        {/* Display all uploaded videos with their output */}  
        <div className="isltotext-video-display">  
          {videoFiles.map((entry, index) => (  
            <div key={index} className="isltotext-video-preview-container">  
              <video controls src={URL.createObjectURL(entry.file)} className="isltotext-video-preview" />  
              {entry.outputText && <p className="isltotext-output-text-content">{entry.outputText}</p>}  
            </div>  
          ))}  
        </div>  
      </div>  

      <div className="isltotext-upload-controls">  
        <input type="file" accept="video/*" onChange={handleVideoUpload} id="file-upload" multiple />  
        <label htmlFor="file-upload" className="isltotext-upload-label">Choose Videos</label>   
        {/* Combined upload button for all selected videos */}  
        <button onClick={processAllVideos} disabled={isLoading || videoFiles.length === 0} className="isltotext-process-button">  
          {isLoading ? 'Processing...' : 'Upload Videos'}  
        </button>  
      </div>  
    </div>  
  );  
};  

export default ISLToText;