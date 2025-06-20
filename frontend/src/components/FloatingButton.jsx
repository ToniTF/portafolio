import React, { useState } from 'react';
import { X, Send, User, Bot } from 'lucide-react';

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charlaHistory, setcharlaHistory] = useState([]);
  const handlecharla = async (userPrompt) => {
    try {
      setIsLoading(true);
      // Agregar el mensaje del usuario al historial
      const newMessage = { text: userPrompt, isUser: true };
      setcharlaHistory(prev => [...prev, newMessage]);
      
      // Usar ruta simple de la API
      const apiUrl = '/api/gemini/charla.php';
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });      // Imprimir la respuesta en texto plano antes de intentar parsearla
      const rawText = await response.text();
      console.log("Respuesta cruda:", rawText);
      
      // Intentar parsear manualmente para identificar el problema
      try {
        const data = JSON.parse(rawText);
        console.log("Respuesta parseada:", data);
        
        // Continuar con el código original...
        if (data.error) {
          throw new Error(data.error);
        }
          // Verificar si la respuesta está vacía o no es relevante
        const responseText = data.response || "";
        if (responseText.trim() === "") {
          throw new Error("No se pudo obtener una respuesta relevante.");
        }
        
        // Si la respuesta contiene un mensaje de rechazo específico, mostrarlo claramente
        if (responseText.includes("Lo siento, solo puedo proporcionar información sobre Antonio Troitiño")) {
          setcharlaHistory(prev => [
            ...prev, 
            { 
              text: "Lo siento, solo puedo responder preguntas sobre Antonio Troitiño y su trabajo como desarrollador web. ¿En qué aspecto de su perfil profesional puedo ayudarte?", 
              isUser: false 
            }
          ]);
        } else {          // Agregar la respuesta de la IA al historial
          setcharlaHistory(prev => [
            ...prev, 
            { text: responseText, isUser: false }
          ]);
        }      } catch (parseError) {
        console.error("Error al parsear JSON:", parseError);
        throw new Error(`Error al parsear la respuesta: ${parseError.message}. Texto recibido: ${rawText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error("Error:", error);
      setcharlaHistory(prev => [
        ...prev, 
        { 
          text: "Lo siento, ha ocurrido un error al conectar con el asistente. Por favor, intenta de nuevo o contacta con Antonio directamente.", 
          isUser: false, 
          isError: true 
        }
      ]);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      handlecharla(prompt);
    }
  };

  return (
    <>
      {/* Botón flotante con imagen personalizada */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-50 rounded-full shadow-lg transition-colors duration-300 overflow-hidden ${
          isOpen ? 'bg-red-500 p-2' : 'bg-white p-0' 
        }`}
        aria-label={isOpen ? "Cerrar charla" : "Abrir charla"}
        style={{ width: isOpen ? '40px' : '50px', height: isOpen ? '40px' : '50px' }}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <img 
            src="/assets/images/charla-avatar.png" 
            alt="charla con Antonio" 
            className="w-full h-full object-cover"
          />
        )}
      </button>

      {/* Ventana de charla */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 border border-gray-200 flex flex-col max-h-[70vh]">
          <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">charla con Antonio</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white p-1 rounded-full hover:bg-blue-600"
            >
              <X size={18} />
            </button>
          </div>

          {/* Historial de charla */}
          <div className="flex-1 p-4 overflow-y-auto min-h-[200px] max-h-[50vh]">            {charlaHistory.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Bot className="mx-auto mb-2" size={24} />
                <p>Hola, soy el asistente virtual de Antonio. Puedo responder a tus preguntas sobre su perfil profesional, habilidades y proyectos.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {charlaHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : message.isError
                            ? 'bg-red-100 text-red-800 rounded-bl-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Formulario de entrada */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`p-2 rounded-lg ${
                  isLoading || !prompt.trim() 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingButton;