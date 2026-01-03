import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, X, Loader2, GripVertical } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! I'm your Bus Assistant. Ask me anything about Route 101 or any Surat bus!", isBot: true, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dragging state
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 180 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef<number | null>(null);
  const pointerDownTime = useRef<number>(0);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { text: input, isBot: false, timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Build history context for varied responses
      const historyContext = newMessages.slice(-6).map(m => 
        `${m.isBot ? 'Assistant' : 'User'}: ${m.text}`
      ).join('\n');

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `CONVERSATION SO FAR:\n${historyContext}\n\nLATEST USER QUESTION: ${currentInput}`,
        config: {
          systemInstruction: `You are the 'Trackit' Smart Assistant for Surat City (SMC/Sitilink). 
          Your personality is: Energetic, helpful, and very 'Surati' (mix of Hindi, English, and local slang like 'Bhai', 'Locho', 'Dumas').
          
          VITAL RULES:
          1. NEVER repeat a previous response from the history above. Be creative.
          2. Use diverse greetings: "Halo!", "Kem cho bhai?", "Hi there!", "Namaste!".
          3. If asked about Route 101: It's currently near SVNIT, 4 mins to VR Mall. Traffic is smooth.
          4. If the user repeats a question, answer it with NEW words or extra trivia about Surat.
          5. Keep it short (2 sentences max).
          6. Match the user's language style (Hinglish/Hindi/English).`,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });

      const botText = response.text || "Sorry, mere system mein error hai. Phir se bolo.";
      setMessages(prev => [...prev, { text: botText, isBot: true, timestamp: new Date() }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { text: "Network issues, boss! Phir se try karo.", isBot: true, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Improved Pointer Logic for FAB
  const onPointerDown = (e: React.PointerEvent) => {
    pointerDownTime.current = Date.now();
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    
    longPressTimer.current = window.setTimeout(() => {
      setIsDragging(true);
      if (navigator.vibrate) navigator.vibrate(50);
    }, 400);
  };

  const onGlobalPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;
    const newX = Math.min(Math.max(10, e.clientX - dragStartPos.current.x), window.innerWidth - 70);
    const newY = Math.min(Math.max(10, e.clientY - dragStartPos.current.y), window.innerHeight - 130);
    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const onGlobalPointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    const duration = Date.now() - pointerDownTime.current;
    if (!isDragging && duration < 350) {
      setIsOpen(true);
    }
    setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener('pointermove', onGlobalPointerMove);
    window.addEventListener('pointerup', onGlobalPointerUp);
    return () => {
      window.removeEventListener('pointermove', onGlobalPointerMove);
      window.removeEventListener('pointerup', onGlobalPointerUp);
    };
  }, [onGlobalPointerMove, onGlobalPointerUp]);

  return (
    <>
      {/* FAB Button */}
      <div 
        onPointerDown={onPointerDown}
        style={{ left: position.x, top: position.y }}
        className={`fixed z-[1000] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-transform active:scale-95 touch-none select-none ${isDragging ? 'bg-orange-500 scale-110' : 'bg-[#004A99] hover:bg-blue-800'}`}
      >
        {isDragging ? (
          <GripVertical className="text-white animate-pulse" />
        ) : (
          <Bot className="text-white" size={28} />
        )}
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex flex-col justify-end pointer-events-none">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-md mx-auto bg-white rounded-t-[2.5rem] shadow-2xl flex flex-col h-3/4 pointer-events-auto animate-slide-up font-poppins">
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between bg-blue-50 rounded-t-[2.5rem]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#004A99] rounded-xl flex items-center justify-center text-white">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-blue-900 uppercase tracking-tight">Bus Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Live Help</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${m.isBot ? 'bg-white text-gray-800 border-l-4 border-blue-600' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white p-4 rounded-2xl flex items-center gap-2 text-gray-400 shadow-sm">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Assistant is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t pb-8">
              <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything about Surat buses..."
                  className="flex-1 bg-transparent px-4 py-3 outline-none font-bold text-gray-700 text-sm placeholder:text-gray-400"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 bg-[#004A99] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default ChatWidget;