import React from "react";

const FloatingButton = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "Hola, ¿puedes ayudarme?" }),
      });

      if (!response.ok) {
        throw new Error("Error al comunicarse con el servidor");
      }

      const data = await response.json();
      console.log("Respuesta de Gemini:", data);
      alert(`Gemini dice: ${data.response}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al comunicarse con la IA.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      title="Hablar con Gemini"
    >
      💬
    </button>
  );
};

export default FloatingButton;