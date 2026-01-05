import { useState, useRef, useEffect } from "react";
import { UserCog, Send, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "expert";
  timestamp: Date;
}

interface ExpertChatInterfaceProps {
  onBack: () => void;
}

export default function ExpertChatInterface({ onBack }: ExpertChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dr. Anna, a licensed psychology specialist. I'm here to provide you with professional guidance and support. How can I help you today?",
      sender: "expert",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue("");

      // Simulate expert response
      setTimeout(() => {
        const expertResponses = [
          "Thank you for sharing that with me. I understand how challenging this must be for you. Let's explore this together. Can you tell me more about when these feelings started?",
          "I appreciate your openness. What you're experiencing is valid, and it's important that you're seeking support. Let me help you work through this step by step.",
          "That's a very common concern, and you're not alone in feeling this way. From a professional perspective, there are several approaches we can explore together. What would you like to focus on first?",
          "I hear you, and I want you to know that seeking help is a sign of strength. Let's work on some strategies that can help you manage these feelings. Have you tried any coping techniques before?"
        ];

        const randomResponse = expertResponses[Math.floor(Math.random() * expertResponses.length)];

        const expertMessage: Message = {
          id: messages.length + 2,
          text: randomResponse,
          sender: "expert",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, expertMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-4 border-b-2 border-green-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="text-green-700 hover:text-green-800 hover:bg-green-50 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-sm">
                  <UserCog className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h2 className="text-green-800" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    Chat with Mental Health Expert
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 500 }}>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Profile Card */}
          <ExpertProfileCard />
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-5">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "expert" && (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center">
                    <UserCog className="w-5 h-5 text-green-700" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-xl px-5 py-4 rounded-3xl shadow-md ${
                  message.sender === "user"
                    ? "bg-green-600 text-white rounded-br-md"
                    : "bg-white text-slate-800 rounded-bl-md border border-green-50"
                }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {message.sender === "expert" && index === 0 && (
                  <p className="text-xs text-green-700 mb-2" style={{ fontWeight: 600 }}>
                    Dr. Anna - Psychology Specialist
                  </p>
                )}
                <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${message.sender === "user" ? "text-green-100" : "text-slate-400"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.sender === "user" && (
                    <CheckCircle2 className="w-3 h-3 text-green-200" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-green-50 border-t border-green-200 px-4 py-2">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-green-800" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            <strong>Confidential:</strong> Conversations are confidential. This service provides guidance and support, not medical diagnosis.
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-2 border-green-100 px-4 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ExpertProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-4 border-2 border-green-200"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-green-200 to-teal-200 rounded-full flex items-center justify-center flex-shrink-0">
          <UserCog className="w-7 h-7 text-green-700" />
        </div>
        <div className="flex-1">
          <h3 className="text-green-900" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            Dr. Anna
          </h3>
          <p className="text-sm text-green-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Psychology Specialist
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-green-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 500 }}>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span style={{ fontFamily: 'Open Sans, sans-serif' }}>Response time: ~2 min</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
          <p className="text-xs text-slate-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Licensed Professional
          </p>
          <p className="text-sm text-green-700" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            15+ Years Experience
          </p>
        </div>
      </div>
    </motion.div>
  );
}
