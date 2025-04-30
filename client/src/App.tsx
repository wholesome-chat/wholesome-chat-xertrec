import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import WebSocketConnection from "./WebSocketConnection";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const ws = useMemo(() => {
    return new WebSocketConnection();
  }, []);
  useEffect(() => {
    ws.connect();
    return () => {
      ws.disconnect();
    };
  }, [ws]);

  useEffect(() => {
    const listener = ws.onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      listener();
    };
  }, [ws]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      ws.sendMessage(input)
      setInput("");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Chat App</h1>
        <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-2 bg-gray-100 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="p-2 mb-2 bg-blue-100 rounded-lg text-gray-800 shadow-sm"
            >
              {message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
