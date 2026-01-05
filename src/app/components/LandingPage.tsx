import { Heart, Shield, Users, Clock, MessageCircle, UserCog } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface LandingPageProps {
  onStartChatbot: () => void;
  onChatWithExpert: () => void;
}

export default function LandingPage({ onStartChatbot, onChatWithExpert }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Logo Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="p-4 bg-gradient-to-br from-teal-100 to-green-100 rounded-full shadow-lg">
              <Heart className="w-16 h-16 text-teal-600 fill-teal-600" />
            </div>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl text-teal-800" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Your Mental Health Companion
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              A safe and supportive space to share, relax, and take care of your mental well-being anytime.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={onStartChatbot}
              className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chatbot
            </Button>
            <Button
              onClick={onChatWithExpert}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            >
              <UserCog className="w-5 h-5 mr-2" />
              Chat with Expert
            </Button>
          </div>
        </motion.div>

        {/* Value Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20"
        >
          <ValueCard
            icon={<Clock className="w-10 h-10 text-teal-600" />}
            title="24/7 Emotional Support"
            description="Get instant support anytime through our AI chatbot or schedule sessions with mental health experts"
          />
          <ValueCard
            icon={<Shield className="w-10 h-10 text-teal-600" />}
            title="Privacy & Anonymous Conversations"
            description="Your conversations are completely confidential and secure. No login required for chatbot support"
          />
          <ValueCard
            icon={<Users className="w-10 h-10 text-teal-600" />}
            title="Support for All Age Groups"
            description="Tailored support for teenagers, adults, and seniors with personalized care approaches"
          />
        </motion.div>

        {/* Service Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 max-w-5xl mx-auto w-full"
        >
          <h2 className="text-center text-2xl md:text-3xl text-teal-800 mb-12" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            Choose Your Support Option
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceOption
              icon={<MessageCircle className="w-12 h-12 text-teal-600" />}
              title="AI Chatbot Support"
              features={[
                "Instant responses 24/7",
                "Emotion-based guidance",
                "Breathing exercises & tips",
                "Completely free and anonymous"
              ]}
              buttonText="Start Chatbot"
              buttonColor="teal"
              onClick={onStartChatbot}
            />
            <ServiceOption
              icon={<UserCog className="w-12 h-12 text-green-600" />}
              title="Expert Mental Health Consultation"
              features={[
                "Licensed professionals",
                "Personalized guidance",
                "Confidential conversations",
                "Professional support"
              ]}
              buttonText="Chat with Expert"
              buttonColor="green"
              onClick={onChatWithExpert}
            />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-8 mt-12">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-teal-600 fill-teal-600" />
            <span className="text-teal-700 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>MindCare</span>
          </div>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            <strong>Important Notice:</strong> MindCare provides emotional support and companionship. Our services do not replace professional mental health care or medical services. In case of emergency, please contact emergency services immediately.
          </p>
          <div className="pt-4 space-y-1 text-sm text-slate-500">
            <p><strong>Crisis Support:</strong> National Suicide Prevention Lifeline: 1-800-273-8255</p>
            <p>Crisis Text Line: Text HOME to 741741</p>
          </div>
          <div className="pt-6 text-xs text-slate-400">
            <p>© 2026 MindCare - Academic E-commerce Project | For Educational Demonstration Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl text-teal-800" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ServiceOptionProps {
  icon: React.ReactNode;
  title: string;
  features: string[];
  buttonText: string;
  buttonColor: "teal" | "green";
  onClick: () => void;
}

function ServiceOption({ icon, title, features, buttonText, buttonColor, onClick }: ServiceOptionProps) {
  const bgColor = buttonColor === "teal" ? "bg-teal-600 hover:bg-teal-700" : "bg-green-600 hover:bg-green-700";
  const borderColor = buttonColor === "teal" ? "border-teal-100" : "border-green-100";

  return (
    <div className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border-2 ${borderColor}`}>
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="p-4 bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl">
          {icon}
        </div>
        <h3 className="text-2xl text-teal-800" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
          {title}
        </h3>
        <ul className="space-y-3 w-full">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-slate-700">
              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0" />
              <span className="text-left" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          onClick={onClick}
          className={`${bgColor} text-white px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all w-full`}
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
