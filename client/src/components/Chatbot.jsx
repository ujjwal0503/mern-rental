import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ChevronUp, ChevronDown } from "lucide-react";
import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);
  
  // Predefined responses for common rental equipment questions
  const responses = {
    greeting: ["Hi there! 👋 How can I help you with equipment rental today?", 
               "Hello! Welcome to our equipment rental service. What can I assist you with?",
               "Welcome! I'm here to help with your equipment rental needs. How can I assist you?"],
    rent: {
      general: "To rent equipment, browse our catalog on the Search page, select the item you need, choose rental dates, and contact the seller. Need help with anything specific?",
      process: "Our rental process is simple: 1) Find equipment 2) Select dates 3) Contact Owner 4) Pick up or request delivery 5) Return on time to avoid extra fees.",
      duration: "We offer flexible rental periods from daily to monthly. Longer rentals qualify for progressive discounts.",
      payment: "We accept credit cards, PayPal, and bank transfers. A security deposit is required for all rentals."
    },
    equipment: {
      types: "We rent Farming equipment (Tractors, bulldozers), gardening tools (lawn mowers, tillers), power tools",
      availability: "Equipment availability varies by location and season. Check our search page for real-time inventory.",
      condition: "All our equipment is regularly serviced and maintained to ensure reliability and safety.",
      popular: "Currently, our most requested items are compact excavators, pressure washers, and portable generators."
    },
    listing: {
      create: "To list your equipment: 1) Sign in 2) Click 'Create Listing' in the Profile Page 3) Fill details 4) Upload photos 5) Set rental terms and pricing.",
      requirements: "To list equipment, you must verify your identity, provide equipment documentation, and set up a Deposit and Price.",
      fees: "We does not charge any commission on successful rentals. No upfront fees to list your equipment.",
      insurance: "We provide optional insurance coverage for both owners and renters. Details can be found on our Insurance page."
    },
    account: {
      signup: "To create an account, click 'Sign Up' at the top right, fill the form or Continue with Google, and you're ready to go!",
      login: "Having trouble logging in? Click 'Forgot Password' or contact support for immediate assistance.",
      profile: "Manage your profile by clicking your username after logging in. You can update Profile picture, username, and password."
    },
    pricing: {
      structure: "Pricing depends on equipment type, rental duration, and location. Discounts apply for longer rentals.",
      deposit: "A security deposit is required for all rentals, typically 20-50% of the equipment value.",
      discounts: "Owner can offer discounts for first-time users, weekly rentals, and monthly rentals."
    },
    delivery: {
      options: "We offer pickup at our locations or delivery service within 50 miles radius for an additional fee.",
      fees: "Delivery Fee Depends on the owner",
      timing: "Depends on the owner."
    },
    return: {
      process: "Return equipment to the same location you picked it up from, or schedule a pickup if you chose delivery.",
      late: "Late returns incur a fee of 150% of the daily rate for each day overdue.",
      damage: "Equipment returned damaged will be assessed by Owner. Repair costs may be deducted from your deposit."
    },
    support: {
      contact: "Reach our support team via the Contact page, email at support@farmtech.com, or call (555) 123-4567.",
      hours: "Our customer support is available Monday-Friday 8am-8pm and Saturday 9am-5pm.",
      emergency: "For after-hours emergencies with rented equipment, call our 24/7 hotline: (555) 987-6543."
    },
    location: {
      stores: "We have rental centers in all over India.",
      hours: "Our rental centers are open Monday-Saturday 7am-7pm and Sunday 9am-4pm.",
      directions: "Find detailed directions to each location on our Locations page or contact support for assistance."
    }
  };

  useEffect(() => {
    // Initial greeting when chatbot opens
    if (isOpen && messages.length === 0) {
      simulateTyping(responses.greeting[Math.floor(Math.random() * responses.greeting.length)]);
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateTyping = (text) => {
    setIsTyping(true);
    // Simulate bot typing with a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text }]);
      setIsTyping(false);
    }, 800);
  };

  const getBotResponse = (msg) => {
    const text = msg.toLowerCase();
    
    // Check for greetings
    if (text.match(/^(hi|hello|hey|greetings|howdy)/)) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    
    // Rental process questions
    if (text.includes("rent") || text.includes("how to rent") || text.includes("rental process")) {
      return responses.rent.general;
    }
    
    if (text.includes("rental period") || text.includes("how long") || text.includes("duration")) {
      return responses.rent.duration;
    }
    
    if (text.includes("payment") || text.includes("pay") || text.includes("deposit")) {
      return responses.rent.payment;
    }
    
    // Equipment questions
    if (text.includes("what equipment") || text.includes("equipment type")) {
      return responses.equipment.types;
    }
    
    if (text.includes("available") || text.includes("in stock")) {
      return responses.equipment.availability;
    }
    
    if (text.includes("condition") || text.includes("quality") || text.includes("maintenance")) {
      return responses.equipment.condition;
    }
    
    if (text.includes("popular") || text.includes("best seller") || text.includes("most rented")) {
      return responses.equipment.popular;
    }
    
    // Listing questions
    if (text.includes("create listing") || text.includes("list my") || text.includes("rent out my")) {
      return responses.listing.create;
    }
    
    if (text.includes("listing requirement") || text.includes("can i list")) {
      return responses.listing.requirements;
    }
    
    if (text.includes("commission") || text.includes("listing fee")) {
      return responses.listing.fees;
    }
    
    // Account questions
    if (text.includes("sign up") || text.includes("create account") || text.includes("register")) {
      return responses.account.signup;
    }
    
    if (text.includes("login") || text.includes("sign in") || text.includes("forgot password")) {
      return responses.account.login;
    }
    
    // Pricing questions
    if (text.includes("price") || text.includes("cost") || text.includes("how much")) {
      return responses.pricing.structure;
    }
    
    if (text.includes("discount") || text.includes("coupon") || text.includes("special offer")) {
      return responses.pricing.discounts;
    }
    
    // Delivery questions
    if (text.includes("delivery") || text.includes("deliver") || text.includes("bring")) {
      return responses.delivery.options;
    }
    
    // Return questions
    if (text.includes("return") || text.includes("give back")) {
      return responses.return.process;
    }
    
    if (text.includes("late") || text.includes("overdue")) {
      return responses.return.late;
    }
    
    if (text.includes("damage") || text.includes("broken")) {
      return responses.return.damage;
    }
    
    // Support questions
    if (text.includes("support") || text.includes("help") || text.includes("contact") || text.includes("talk to human")) {
      return responses.support.contact;
    }
    
    if (text.includes("hours") || text.includes("when open") || text.includes("available time")) {
      return responses.support.hours;
    }
    
    // Location questions
    if (text.includes("location") || text.includes("where") || text.includes("store")) {
      return responses.location.stores;
    }
    
    // Default response if no pattern matches
    return "I'm not sure I understood that. You can ask about renting equipment, listing your own equipment, pricing, delivery options, or contact support.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    
    // Get bot response after a short delay
    const botResponse = getBotResponse(input);
    simulateTyping(botResponse);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Bot Icon Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <div className="chatbot-avatar">
                <MessageCircle size={20} />
              </div>
              <h3>Equipment Rental Assistant</h3>
            </div>
            <button className="chatbot-minimize" onClick={toggleChat}>
              <ChevronDown size={20} />
            </button>
          </div>
          
          <div className="chat-window" ref={chatWindowRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from}`}>
                {msg.from === "bot" && <div className="bot-icon"><MessageCircle size={16} /></div>}
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot typing">
                <div className="bot-icon"><MessageCircle size={16} /></div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about equipment rental..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-button" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
          
          <div className="chatbot-footer">
            <div className="quick-questions">
              <span className="quick-question" onClick={() => {
                setInput("What equipment do you rent?");
                handleSend();
              }}>Available equipment</span>
              <span className="quick-question" onClick={() => {
                setInput("How does rental work?");
                handleSend();
              }}>Rental process</span>
              <span className="quick-question" onClick={() => {
                setInput("How to list my equipment?");
                handleSend();
              }}>List equipment</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;