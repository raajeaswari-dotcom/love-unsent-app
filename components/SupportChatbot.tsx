import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { SparklesIcon, CloseIcon } from './Icons';

const SupportChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chat) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "You are a friendly and helpful customer support agent for 'Love Unsent', an eCommerce platform for handwritten letters. Your tone should be warm, empathetic, and professional. Answer questions about products (Classic, Open When, Unsent letters), order tracking, shipping within India, and payment options. If you don't know an answer, politely say you need to check with a human colleague.",
                    },
                });
                setChat(newChat);
                 setMessages([{ role: 'model', text: "Hello! How can I help you today with your heartfelt letter?" }]);
            } catch (error) {
                console.error("Failed to initialize AI Chat:", error);
                setMessages([{ role: 'model', text: "Sorry, I'm unable to connect right now. Please try again later." }]);
            }
        }
    }, [isOpen, chat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !chat || isLoading) return;

        const userMessage = { role: 'user' as const, text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            const modelMessage = { role: 'model' as const, text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Error sending message to AI:', error);
            const errorMessage = { role: 'model' as const, text: "I'm having trouble responding right now. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-6 right-6 bg-[#5B2C23] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all z-50"
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <SparklesIcon className="w-8 h-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-[#F5EADF] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-[#8C6653]">
                    <header className="bg-[#8C6653] p-4 text-white text-center font-bold">
                        Customer Support
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-[#5B2C23] text-white' : 'bg-white text-[#5B2C23]'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-xl bg-white text-[#5B2C23]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-2 border-t border-[#8C6653]">
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                             <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full bg-transparent border border-[#8C6653] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                            />
                            <button type="submit" className="bg-[#5B2C23] text-white font-bold p-2 rounded-full hover:bg-opacity-90 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SupportChatbot;