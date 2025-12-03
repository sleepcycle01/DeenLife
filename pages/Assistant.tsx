
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User, Sparkles, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "As-salamu alaykum! I am your AI spiritual companion. How can I assist you with your Deen today?",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    // Prepare history for API
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    try {
      // Create a placeholder message for the streaming response
      const responseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: responseId,
        role: 'model',
        text: '', // Start empty
        timestamp: Date.now()
      }]);

      const stream = await sendMessageToGemini(userMsg.text, history);
      
      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === responseId ? { ...msg, text: fullText } : msg
        ));
      }

    } catch (err) {
      console.error(err);
      setError("I'm having trouble connecting right now. Please check your internet or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in">
      <div className="mb-4 animate-slide-up">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          Ask AI <Sparkles className="text-emerald-400" size={24} />
        </h2>
        <p className="text-slate-400">Your companion for knowledge and spiritual advice.</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-y-auto space-y-4 mb-4 relative animate-scale-in delay-100">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 rounded-bl-none'
            }`}>
              <div className="flex items-center gap-2 mb-2 opacity-50 text-xs uppercase tracking-wider font-bold">
                {msg.role === 'user' ? <User size={12} /> : <Sparkles size={12} />}
                {msg.role === 'user' ? 'You' : 'DeenLife AI'}
              </div>
              <div className="prose prose-invert prose-sm">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && messages[messages.length - 1].role === 'user' && (
           <div className="flex justify-start animate-fade-in">
             <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center text-slate-400 text-sm">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
               Thinking...
             </div>
           </div>
        )}

        {error && (
          <div className="flex justify-center my-4 animate-fade-in">
            <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <AlertTriangle size={16} />
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center gap-2 animate-slide-up delay-200">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about a verse, Hadith, or advice..."
          className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none"
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition hover:scale-105 active:scale-95"
        >
          <Send size={20} />
        </button>
      </div>
      <p className="text-center text-xs text-slate-600 mt-2 animate-fade-in delay-300">
        AI can make mistakes. Please verify religious rulings with a qualified scholar.
      </p>
    </div>
  );
};

export default Assistant;
