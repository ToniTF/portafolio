import React, { useState } from "react";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleChat = async (userPrompt) => {
    try {
      setIsLoading(true);
      // Agregar el mensaje del usuario al historial
      const newMessage = { text: userPrompt, isUser: true };
      setChatHistory(prev => [...prev, newMessage]);
      
      // Usar ruta simple de la API
      const apiUrl = '/api/gemini/chat.php';
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.ok) {
        throw new Error("Error al comunicarse con el servidor");
      }

      const data = await response.json();
      console.log("Respuesta de Gemini:", data);
      
      if (data.success) {
        // Agregar la respuesta de la IA al historial
        setChatHistory(prev => [...prev, { text: data.response, isUser: false }]);
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error:", error);
      setChatHistory(prev => [...prev, { 
        text: "Lo siento, hubo un problema al procesar tu solicitud.", 
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      handleChat(prompt);
    }
  };
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 h-96 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-blue-500 dark:bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Chat con Gemini</h3>
            <button 
              onClick={handleClick}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                <p>👋 ¡Hola! Soy Gemini.</p>
                <p className="mt-2">¿En qué puedo ayudarte hoy?</p>
              </div>
            ) : (
              <div className="space-y-3">
                {chatHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg max-w-[80%] ${
                      message.isUser 
                        ? 'ml-auto bg-blue-500 text-white' 
                        : 'mr-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    } ${message.isError ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : ''}`}
                  >
                    {message.text}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex space-x-1 justify-center p-2">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg disabled:opacity-50"
              disabled={!prompt.trim() || isLoading}
            >
              Enviar
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
          title="Hablar con Gemini"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default FloatingButton;