"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Send, Sparkles, X, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  currentPage?: string
  userRole?: string
}

export function AIAssistant({ currentPage = "home", userRole = "guest" }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Context-aware knowledge base
  const getContextualResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    // Greeting responses
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("help")) {
      return `Hi there! 👋 I'm your TD Carpool assistant. I'm here to help you navigate the platform and make the most of your carpooling experience. What would you like to know?`
    }

    // Booking related queries
    if (lowerQuery.includes("book") || lowerQuery.includes("ride") || lowerQuery.includes("find")) {
      return `To book a ride:\n\n1. Go to your Dashboard\n2. Use the "Find Rides" tab\n3. Search by location or browse available trips\n4. Click "Book Ride" on your preferred trip\n5. The driver will be notified of your request\n\nTip: You can book rides up to 2 weeks in advance! 🚗`
    }

    // Trip creation queries
    if (
      lowerQuery.includes("offer") ||
      lowerQuery.includes("create") ||
      lowerQuery.includes("post") ||
      lowerQuery.includes("trip")
    ) {
      return `To offer a ride:\n\n1. Click "Offer a Ride" from your Dashboard\n2. Fill in your trip details:\n   • Pickup location\n   • TD office destination\n   • Date and time\n   • Available seats\n   • Price per seat\n3. Choose your settings (auto-approve, recurring)\n4. Click "Create Trip"\n\nYour trip will be visible to other TD colleagues immediately! ✨`
    }

    // Admin related queries
    if (lowerQuery.includes("admin") || lowerQuery.includes("manage") || lowerQuery.includes("moderate")) {
      if (userRole === "admin") {
        return `As an admin, you can:\n\n• **User Management**: View all users, suspend/activate accounts\n• **Trip Management**: Monitor all trips, remove inappropriate content\n• **Reports**: Handle user reports and complaints\n• **Analytics**: View platform statistics and usage\n\nAccess the Admin Panel from your dashboard to manage the platform effectively. 🛡️`
      } else {
        return `Admin features are only available to administrators. If you need admin assistance, please contact your TD IT department or platform administrator.`
      }
    }

    // Account and profile queries
    if (
      lowerQuery.includes("account") ||
      lowerQuery.includes("profile") ||
      lowerQuery.includes("signup") ||
      lowerQuery.includes("login")
    ) {
      return `For account management:\n\n• **Sign Up**: Use your @td.com email address\n• **Profile**: Update your preferences in Dashboard settings\n• **Security**: Change password in account settings\n• **Roles**: Choose between Driver, Rider, or Both\n\nRemember: Only TD employees with valid @td.com emails can join the platform! 🔐`
    }

    // Safety and guidelines
    if (lowerQuery.includes("safe") || lowerQuery.includes("guidelines") || lowerQuery.includes("rules")) {
      return `Safety Guidelines:\n\n• **Verification**: All users must use TD email addresses\n• **Ratings**: Rate your experience after each trip\n• **Reporting**: Report any inappropriate behavior\n• **Communication**: Keep conversations professional\n• **Meeting Points**: Use safe, public pickup locations\n\nYour safety is our priority! If you encounter any issues, use the report feature or contact admin. 🛡️`
    }

    // Payment and pricing
    if (
      lowerQuery.includes("pay") ||
      lowerQuery.includes("price") ||
      lowerQuery.includes("cost") ||
      lowerQuery.includes("money")
    ) {
      return `About Pricing:\n\n• **Driver Sets Price**: Each driver sets their own price per seat\n• **Fair Sharing**: Prices typically cover gas and parking costs\n• **Payment**: Currently handled between users (future: integrated payments)\n• **Savings**: Track your monthly savings on your dashboard\n\nCarpooling saves money and helps the environment! 💚`
    }

    // Technical support
    if (
      lowerQuery.includes("bug") ||
      lowerQuery.includes("error") ||
      lowerQuery.includes("problem") ||
      lowerQuery.includes("issue")
    ) {
      return `Having technical issues?\n\n1. **Refresh** the page first\n2. **Clear** your browser cache\n3. **Check** your internet connection\n4. **Try** a different browser\n\nIf problems persist, please contact TD IT support or report the issue through the platform. We're here to help! 🔧`
    }

    // Default response with suggestions
    return `I'm not sure about that specific question, but I can help you with:\n\n• 🚗 **Booking rides** and finding trips\n• ✨ **Creating trip offers** as a driver\n• 👥 **Account management** and settings\n• 🛡️ **Safety guidelines** and best practices\n• 💰 **Pricing and payments** information\n• 🔧 **Technical support** and troubleshooting\n\nWhat would you like to know more about?`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getContextualResponse(inputValue),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded && messages.length === 0) {
      // Add welcome message when first opened
      const welcomeMessage: Message = {
        id: "welcome",
        type: "assistant",
        content: `Welcome to TD Carpool! 🚗\n\nI'm your AI assistant, here to help you navigate the platform. Whether you're looking to book a ride, offer a trip, or learn about our features, I've got you covered!\n\nWhat can I help you with today?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Button
              onClick={toggleExpanded}
              className="w-full h-10 px-4 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full justify-start"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm">Ask AI Assistant...</span>
              <Sparkles className="w-4 h-4 ml-auto text-green-500" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 h-[500px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/5">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">TD Assistant</h3>
                  <p className="text-xs text-gray-600">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="text-gray-600 hover:text-gray-900 hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 h-[340px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.type === "user"
                          ? "bg-green-500 text-white ml-4"
                          : "bg-white/20 backdrop-blur-sm text-gray-900 mr-4 border border-white/30"
                      }`}
                    >
                      {message.type === "assistant" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-4 h-4 text-green-600" />
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            AI Assistant
                          </Badge>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === "user" ? "text-green-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/20 backdrop-blur-sm text-gray-900 mr-4 border border-white/30 rounded-2xl px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-green-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-white/20 bg-white/5">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about TD Carpool..."
                  className="flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-gray-900 placeholder:text-gray-600 focus:bg-white/30 focus:border-green-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {["How to book a ride?", "Create a trip", "Safety guidelines", "Pricing info"].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    size="sm"
                    onClick={() => setInputValue(suggestion)}
                    className="text-xs bg-white/10 hover:bg-white/20 text-gray-700 border border-white/20"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
