import { Heart } from "lucide-react";

type Screen = "landing" | "chatbot" | "expert-chat";

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { label: "Home", screen: "landing" as Screen },
    { label: "Chatbot", screen: "chatbot" as Screen },
    { label: "Expert Chat", screen: "expert-chat" as Screen },
    { label: "Support", screen: "landing" as Screen },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Heart className="w-7 h-7 text-teal-600 fill-teal-600" />
            <span className="text-xl font-semibold text-teal-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              MindCare
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.screen)}
                className={`text-sm font-medium transition-colors ${
                  currentScreen === item.screen
                    ? "text-teal-700 border-b-2 border-teal-700 pb-1"
                    : "text-slate-600 hover:text-teal-600"
                }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-teal-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
