import React, { useState, useEffect, useRef } from "react"; // Import useRef and useEffect
import "../styles/TextToIsl.css";
import Header from './Header';

const TextToISL = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null); // Create a reference for the end of the messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    // Add the user's input to the message list
    setMessages((prevMessages) => [
      ...prevMessages, // Append new message to the end
      { type: "user", content: text }
    ]);

    // Clear the text input
    setText("");

    try {
      const response = await fetch("http://localhost:5000/api/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      // Add the generated video URL as a message
      setMessages((prevMessages) => [
        ...prevMessages, // Append new message to the end
        { type: "bot", content: data.videoURL }
      ]);

    } catch (error) {
      console.error("Error processing text:", error);
    }
  };

  // Scroll to the bottom of the messages when a new message is added
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <Header />
      <h1 className="text-title">Text To ISl Converter</h1>
      <div className="text-to-isl-container">
        <div className="text-to-isl-content">
          <div className="message-display">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === "user" ? "user-message" : "bot-message"}`}
              >
                {message.type === "user" ? message.content : (
                  <div>
                    <h2>Generated ISL Video</h2>
                    <video controls src={message.content} className="video-output" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messageEndRef} /> {/* This div is used to scroll to the bottom */}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="text-input-form">
            <input
              type="text"
              placeholder="Enter text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-input"
            />
            <button type="submit" className="submit-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-arrow-up" viewBox="0 0 16 16">
                                                              <path fill-rule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-2.8 7a.5.5 0 1 1-.928-.372l1.895-4.738-7.494 7.494 1.376 2.162a.5.5 0 1 1-.844.537l-1.531-2.407L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM5.93 9.363l7.494-7.494L1.591 6.602z"/>
                                                              <path fill-rule="evenodd" d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354a.5.5 0 0 0-.722.016l-1.149 1.25a.5.5 0 1 0 .737.676l.28-.305V14a.5.5 0 0 0 1 0v-1.793l.396.397a.5.5 0 0 0 .708-.708z"/>
                                                            </svg>
            </button>
          </form>
    </div>
  );
};

export default TextToISL;