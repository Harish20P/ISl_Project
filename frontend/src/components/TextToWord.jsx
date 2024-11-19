import React, { useState, useEffect, useRef } from "react";
import "../styles/TextToWord.css";
import Header from './Header';

const TextToWord = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);  // To handle loading state
  const messageEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "") return; // Prevent submitting empty text

    // Add the user's input to the message list
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: text }
    ]);

    // Clear the text input
    setText("");
    setLoading(true);  // Start loading

    try {
      const response = await fetch("http://localhost:5000/api/process-word-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the generated image URL as a message
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", content: data.imageURL }
        ]);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error("Failed to communicate with the server", error);
    } finally {
      setLoading(false); // Stop loading
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
      <h1 className="text-title">Text To Word Converter</h1>
      <div className="text-to-word-container">
        <div className="text-to-word-content">
          <div className="message-display">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === "user" ? "user-message" : "bot-message"}`}
              >
                {message.type === "user" ? message.content : (
                  <img src={message.content} alt="Generated" className="image-output" />
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
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
        <button 
          type="submit" 
          className="submit-button" 
          disabled={loading}  // Disable button while loading
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-arrow-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-2.8 7a.5.5 0 1 1-.928-.372l1.895-4.738-7.494 7.494 1.376 2.162a.5.5 0 1 1-.844.537l-1.531-2.407L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM5.93 9.363l7.494-7.494L1.591 6.602z"/>
            <path fillRule="evenodd" d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354a.5.5 0 0 0-.722.016l-1.149 1.25a.5.5 0 1 0 .737.676l.28-.305V14a.5.5 0 0 0 1 0v-1.793l.396.397a.5.5 0 0 0 .708-.708z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TextToWord;