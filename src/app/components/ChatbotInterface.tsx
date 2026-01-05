import { useState, useRef, useEffect } from "react";
import { Heart, Send, ArrowLeft, Smile, Frown, Angry, Meh, Wind, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

type Emotion = "happy" | "stressed" | "sad" | "angry";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotInterfaceProps {
  onBack: () => void;
}

export default function ChatbotInterface({ onBack }: ChatbotInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi, I'm MindCare. How are you feeling today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showEmotionButtons, setShowEmotionButtons] = useState(true);
  const [showFollowUpOptions, setShowFollowUpOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEmotionSelect = (emotion: Emotion) => {
    const emotionTexts = {
      happy: "I'm feeling happy!",
      stressed: "I'm feeling stressed",
      sad: "I'm feeling sad",
      angry: "I'm feeling angry"
    };

    const userMessage: Message = {
      id: messages.length + 1,
      text: emotionTexts[emotion],
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowEmotionButtons(false);

    // Bot response based on emotion
    setTimeout(() => {
      const botResponses = {
        happy: "That's wonderful to hear! 😊 I'm so glad you're feeling positive today. What's bringing you joy?",
        stressed: "I understand that stress can be overwhelming. You're not alone in this. Would you like to try a breathing exercise, or would you prefer to talk about what's on your mind?",
        sad: "I'm here for you. Your feelings are valid, and it's okay to feel sad sometimes. Would you like to share what's bothering you? I'm listening.",
        angry: "It's completely natural to feel angry. Let's work through this together. Would you like to talk about it or try some calming techniques?"
      };

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[emotion],
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setShowFollowUpOptions(true);
    }, 1000);
  };

  const handleFollowUpOption = (option: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: option,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowFollowUpOptions(false);

    // Bot response based on option
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        "Breathing exercise": "Great choice! Let's practice together:\n\n🌬️ Box Breathing Technique:\n1. Breathe in slowly for 4 seconds\n2. Hold your breath for 4 seconds\n3. Exhale slowly for 4 seconds\n4. Hold for 4 seconds\n5. Repeat 3-5 times\n\nTake your time. How do you feel now?",
        "Talk about your feelings": "I'm here to listen without judgment. This is a safe space for you. Take your time and share whatever is on your mind. What would you like to talk about?",
        "Daily motivation": "Here's something to inspire you:\n\n✨ 'You are stronger than you know. Every step forward, no matter how small, is progress. Be proud of yourself.'\n\n💪 Remember: It's okay to have difficult days. What matters is that you're here, and you're trying. That takes courage.",
      };

      const botMessage: Message = {
        id: messages.length + 2,
        text: responses[option] || "Thank you for sharing. How else can I support you today?",
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1200);
  };

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

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: "Thank you for sharing that with me. I hear you, and your feelings are important. Remember, you're taking a positive step by talking about how you feel. Is there anything specific you'd like help with today?",
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
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
      <header className="bg-white shadow-md px-4 py-4 border-b-2 border-teal-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl shadow-sm">
                <Heart className="w-7 h-7 text-teal-600 fill-teal-600" />
              </div>
              <div>
                <h2 className="text-teal-800" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  MindCare Chatbot
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
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-5">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-xl px-5 py-4 rounded-3xl shadow-md ${
                  message.sender === "user"
                    ? "bg-teal-600 text-white rounded-br-md"
                    : "bg-white text-slate-800 rounded-bl-md border border-teal-50"
                }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${message.sender === "user" ? "text-teal-100" : "text-slate-400"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Emotion Buttons */}
          {showEmotionButtons && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4 border border-teal-100">
                <p className="text-sm text-slate-700 mb-3" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600 }}>
                  Quick response:
                </p>
                <div className="flex flex-wrap gap-3">
                  <EmotionButton
                    icon={<Smile className="w-4 h-4" />}
                    label="Happy"
                    color="green"
                    onClick={() => handleEmotionSelect("happy")}
                  />
                  <EmotionButton
                    icon={<Meh className="w-4 h-4" />}
                    label="Stressed"
                    color="orange"
                    onClick={() => handleEmotionSelect("stressed")}
                  />
                  <EmotionButton
                    icon={<Frown className="w-4 h-4" />}
                    label="Sad"
                    color="blue"
                    onClick={() => handleEmotionSelect("sad")}
                  />
                  <EmotionButton
                    icon={<Angry className="w-4 h-4" />}
                    label="Angry"
                    color="red"
                    onClick={() => handleEmotionSelect("angry")}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Follow-up Options */}
          {showFollowUpOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4 border border-teal-100">
                <p className="text-sm text-slate-700 mb-3" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600 }}>
                  How can I help you?
                </p>
                <div className="flex flex-col gap-3">
                  <FollowUpOption
                    icon={<Wind className="w-5 h-5" />}
                    label="Breathing exercise"
                    onClick={() => handleFollowUpOption("Breathing exercise")}
                  />
                  <FollowUpOption
                    icon={<MessageCircle className="w-5 h-5" />}
                    label="Talk about your feelings"
                    onClick={() => handleFollowUpOption("Talk about your feelings")}
                  />
                  <FollowUpOption
                    icon={<Sparkles className="w-5 h-5" />}
                    label="Daily motivation"
                    onClick={() => handleFollowUpOption("Daily motivation")}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-200 px-4 py-2">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-amber-800" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            This chatbot provides emotional support and does not replace professional care.
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-2 border-teal-100 px-4 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface EmotionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: "green" | "orange" | "blue" | "red";
  onClick: () => void;
}

function EmotionButton({ icon, label, color, onClick }: EmotionButtonProps) {
  const colorClasses = {
    green: "bg-green-50 hover:bg-green-100 text-green-700 border-green-200",
    orange: "bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200",
    blue: "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200",
    red: "bg-red-50 hover:bg-red-100 text-red-700 border-red-200",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all text-sm border-2 shadow-sm hover:shadow-md ${colorClasses[color]}`}
      style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 500 }}
    >
      {icon}
      {label}
    </button>
  );
}

interface FollowUpOptionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function FollowUpOption({ icon, label, onClick }: FollowUpOptionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-2xl transition-all text-sm border-2 border-teal-200 shadow-sm hover:shadow-md"
      style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 500 }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
