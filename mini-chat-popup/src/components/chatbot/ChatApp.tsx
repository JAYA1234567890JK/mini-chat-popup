import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import RobotIcon from "@mui/icons-material/Android";
import SendIcon from "@mui/icons-material/Send";
import "./chat.css";

// Interface for each chat message
interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

const ChatApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

   // Toggles chat window open/close state with animation for closing
  const toggleChatWindow = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 500);
    } else {
      setIsOpen(true);
    }
  };

  // Handles sending a message from the user
  const sendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = {
        text: input,
        sender: "user",
        timestamp: Date.now(),
      };
      setChatHistory((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      // Simulate bot's delayed response

      setTimeout(() => {
        const botMessage: Message = {
          text: generateBotResponse(), // Generate random response for bot
          sender: "bot",
          timestamp: Date.now(),
        };
        setChatHistory((prev) => [...prev, botMessage]); // Add bot's response to chat history
        setIsTyping(false);
      }, 1000);  // 1-second delay for bot response
    }
  };

  // Generates a random response from the bot

  const generateBotResponse = () => {
    const responses = [
      "Thank you for your message. We're here to assist!",
      "Can I help you with something else?",
      "Our team is working on your request.",
      "Feel free to ask anything!",
      "Thanks for reaching out!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

// Formats timestamp to display how much time ago a message was sent

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const secondsElapsed = Math.floor((now - timestamp) / 1000);

    if (secondsElapsed < 60)
      return `${secondsElapsed} second${secondsElapsed === 1 ? "" : "s"} ago`;
    const minutesElapsed = Math.floor(secondsElapsed / 60);
    return `${minutesElapsed} minute${minutesElapsed === 1 ? "" : "s"} ago`;
  };

  return (
    <Box position="fixed" bottom={20} right={20} borderRadius={10}>
      {isOpen ? (
        <Box
          className={`chat-window ${isOpen ? "open" : ""} ${
            isClosing ? "close" : ""
          }`}
          sx={{
            width: 400,
            height: 500,
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
        {/* chat header with close button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              p: 2,
              backgroundColor: "#3f51b5",
              color: "white",
            }}
          >
            <Typography sx={{ fontFamily: "Poppins" }}>Support Chat</Typography>
            <Button onClick={toggleChatWindow} className="close-button">
              <CloseIcon sx={{ color: "white" }} />
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {chatHistory.map((message, index) => (
              // Individual message box styling based on sender (user/bot)
              <Box
                key={index}
                sx={{
                  alignSelf:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    message.sender === "user" ? "#e0f7fa" : "#f5f5f5",
                  padding: 1,
                  borderRadius: 2,
                  maxWidth: "80%",
                }}
              >
                {message.sender === "user" ? (
                  <PersonIcon sx={{ marginRight: 1 }} />
                ) : (
                  <RobotIcon sx={{ marginRight: 1 }} />
                )}
                <Typography variant="body2" fontFamily={"Poppins"}>
                  {message.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "gray", marginLeft: 1 }}
                >
                  {formatTimestamp(message.timestamp)}
                </Typography>
              </Box>
            ))}
            {isTyping && (
              // Bot typing indicator
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <RobotIcon sx={{ marginRight: 1 }} />{" "}
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Poppins", color: "gray" }}
                >
                  Bot is typing...
                </Typography>
              </Box>
            )}
          </Box>
        
          {/* Input field and send button */}

          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              value={input}
              sx={{
                "& fieldset": { border: "none" },
              }}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            {input.trim() && (
              <Button
                onClick={sendMessage}
                sx={{ color: "#3f51b5", marginRight: 1 }}
              >
                <SendIcon />
              </Button>
            )}
          </Box>
        </Box>
      ) : (

        // Floating chat button
        
        <Button
          className="chat-button"
          onClick={toggleChatWindow}
          sx={{
            backgroundColor: "#3f51b5",
            color: "white",
            padding: 2,
            borderRadius: "50%",
            minWidth: "50px",
            minHeight: "50px",
          }}
        >
          <ChatIcon />
        </Button>
      )}
    </Box>
  );
};

export default ChatApp;
