import { useState } from "react";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ChatbotInterface from "./components/ChatbotInterface";
import ExpertChatInterface from "./components/ExpertChatInterface";

type Screen = "landing" | "chatbot" | "expert-chat";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      
      {currentScreen === "landing" && (
        <LandingPage
          onStartChatbot={() => setCurrentScreen("chatbot")}
          onChatWithExpert={() => setCurrentScreen("expert-chat")}
        />
      )}
      {currentScreen === "chatbot" && (
        <ChatbotInterface onBack={() => setCurrentScreen("landing")} />
      )}
      {currentScreen === "expert-chat" && (
        <ExpertChatInterface onBack={() => setCurrentScreen("landing")} />
      )}
    </div>
  );
}
