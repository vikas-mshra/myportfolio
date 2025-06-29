import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "./ChatBot.scss";

// Constants for input validation
const MAX_MESSAGE_LENGTH = 50;
const MIN_MESSAGE_LENGTH = 1;

// Rate limiting constants
const MAX_REQUESTS_PER_DAY = 5;
const RATE_LIMIT_KEY = "chatbot_rate_limit";
const ENCRYPTION_KEY = "vbot_2024_secure_key_xyz789";

// Key encryption function
const encryptKey = (key) => {
  try {
    // Simple XOR encryption for the key
    let encrypted = '';
    for (let i = 0; i < key.length; i++) {
      const charCode = key.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      encrypted += String.fromCharCode(charCode);
    }
    return btoa(encrypted);
  } catch (error) {
    console.error('Key encryption error:', error);
    return key; // Fallback to original key
  }
};

// Get encrypted localStorage key
const getEncryptedKey = () => {
  return encryptKey(RATE_LIMIT_KEY);
};

// Simple encryption/decryption functions
const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    const encoded = btoa(jsonString);
    // Simple XOR encryption with the key
    let encrypted = "";
    for (let i = 0; i < encoded.length; i++) {
      const charCode =
        encoded.charCodeAt(i) ^
        ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      encrypted += String.fromCharCode(charCode);
    }
    return btoa(encrypted);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

const decryptData = (encryptedData) => {
  try {
    // Simple XOR decryption with the key
    const decoded = atob(encryptedData);
    let decrypted = "";
    for (let i = 0; i < decoded.length; i++) {
      const charCode =
        decoded.charCodeAt(i) ^
        ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      decrypted += String.fromCharCode(charCode);
    }
    const jsonString = atob(decrypted);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Rate limiting utilities
const getRateLimitData = () => {
  try {
    const encryptedKey = getEncryptedKey();
    const encryptedData = localStorage.getItem(encryptedKey);
    if (!encryptedData) return null;

    const data = decryptData(encryptedData);
    if (!data) return null;

    // Check if 24 hours have passed since last reset
    const now = new Date().getTime();
    const lastReset = data.lastReset || 0;
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (now - lastReset >= twentyFourHours) {
      // Reset the counter
      localStorage.removeItem(encryptedKey);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error reading rate limit data:", error);
    return null;
  }
};

const updateRateLimitData = (requestCount) => {
  try {
    const now = new Date().getTime();
    const data = {
      requestCount,
      lastReset: now,
      lastRequest: now,
    };

    const encryptedData = encryptData(data);
    if (encryptedData) {
      const encryptedKey = getEncryptedKey();
      localStorage.setItem(encryptedKey, encryptedData);
    }
  } catch (error) {
    console.error("Error updating rate limit data:", error);
  }
};

const checkRateLimit = () => {
  const data = getRateLimitData();
  if (!data) {
    // First request of the day or after 24 hours
    updateRateLimitData(1);
    return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - 1 };
  }

  const remaining = MAX_REQUESTS_PER_DAY - data.requestCount;
  return { allowed: remaining > 0, remaining: Math.max(0, remaining) };
};

// The full system prompt is now stored in your Netlify Function, not here.
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Vikas Mishra. What you want to know about me?",
      sender: "bot",
      // We will add a 'role' for easier processing in the backend
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState({
    allowed: true,
    remaining: MAX_REQUESTS_PER_DAY,
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check rate limit on component mount
  useEffect(() => {
    const rateLimit = checkRateLimit();
    setRateLimitInfo(rateLimit);
  }, []);

  // Secure input handling with length validation
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setInputMessage(value);
    }
  };

  // Secure message validation
  const validateMessage = (message) => {
    if (!message || typeof message !== "string") return false;
    if (
      message.length < MIN_MESSAGE_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    )
      return false;
    if (message.trim().length === 0) return false;
    return true;
  };

  const handleSendMessage = async () => {
    if (!validateMessage(inputMessage) || isLoading) return;

    // Check rate limit before sending
    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      const rateLimitMessage = {
        id: Date.now(),
        text: `You've reached the daily limit of ${MAX_REQUESTS_PER_DAY} messages. Please try again tomorrow.`,
        sender: "bot",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, rateLimitMessage]);
      setRateLimitInfo(rateLimit);
      return;
    }

    const sanitizedMessage = inputMessage.trim();
    const userMessage = {
      id: Date.now(),
      text: sanitizedMessage,
      sender: "user",
      // Add the 'role' for the OpenAI API
      role: "user",
      timestamp: new Date(),
    };

    // Add user message to the UI immediately
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    // Update rate limit counter
    const currentData = getRateLimitData();
    const newRequestCount = currentData ? currentData.requestCount + 1 : 1;
    updateRateLimitData(newRequestCount);

    // Update rate limit info in state
    const newRateLimit = {
      allowed: true,
      remaining: MAX_REQUESTS_PER_DAY - newRequestCount,
    };
    setRateLimitInfo(newRateLimit);

    try {
      // Call your new Netlify Function endpoint
      const response = await axios.post("/.netlify/functions/chatbot", {
        // Pass the conversation history to your function
        userMessage: sanitizedMessage,
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: "bot",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Netlify Function:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      let errorText =
        "Sorry, I'm having trouble connecting right now. Please try again later.";

      // The 429 status code will now be sent by Cloudflare/Netlify, not OpenAI directly
      if (error.response?.status === 429) {
        errorText =
          "You've sent too many messages. Please wait a moment before trying again.";
      } else if (error.response?.status >= 500) {
        errorText =
          "The server is experiencing issues. Please try again later.";
      } else if (!error.response) {
        errorText = "Network error. Please check your internet connection.";
      }

      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: "bot",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const remainingChars = MAX_MESSAGE_LENGTH - inputMessage.length;
  const isMessageValid = validateMessage(inputMessage) && rateLimitInfo.allowed;

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Chat Window */}
      <motion.div
        className={`chat-window ${isOpen ? "open" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Chat Header */}
        <div className="chat-header">
          <h3>V-Bot</h3>
          <div className="rate-limit-info">
            <span
              className={`remaining-requests ${
                rateLimitInfo.remaining < 5 ? "warning" : ""
              }`}
            >
              {rateLimitInfo.remaining} requests left today
            </span>
          </div>
        </div>

        {/* Messages Container */}
        <div className="messages-container">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message ${message.sender}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="timestamp">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              className="message bot"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={
                rateLimitInfo.allowed
                  ? "Type your message..."
                  : "Daily limit reached. Try again tomorrow."
              }
              disabled={isLoading || !rateLimitInfo.allowed}
              rows="1"
              maxLength={MAX_MESSAGE_LENGTH}
              data-max-length={MAX_MESSAGE_LENGTH}
              data-min-length={MIN_MESSAGE_LENGTH}
            />
            <div className="char-counter">
              <span className={remainingChars < 20 ? "warning" : ""}>
                {remainingChars}
              </span>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!isMessageValid || isLoading}
            className="send-btn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ChatBot;
