// Chat con Gemini AI - JavaScript Reutilizable
let isProcessing = false;
const CHAT_STORAGE_KEY = 'gemini_chat_history';

// Cargar historial del chat al inicializar
function loadChatHistory() {
    const savedHistory = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (savedHistory) {
        const messages = JSON.parse(savedHistory);
        const messagesContainer = document.getElementById('chatMessages');
        
        // Limpiar mensajes existentes excepto el mensaje de bienvenida
        messagesContainer.innerHTML = '';
        
        // Agregar mensaje de bienvenida
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message ai-message';
        welcomeDiv.innerHTML = '<strong>Gemini:</strong> ¡Hola! Soy Gemini, tu asistente de inteligencia artificial. ¿En qué puedo ayudarte hoy?';
        messagesContainer.appendChild(welcomeDiv);
        
        // Agregar mensajes guardados
        messages.forEach(msg => {
            addMessageToDOM(msg.text, msg.type, false);
        });
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Guardar historial en sessionStorage
function saveChatHistory() {
    const messagesContainer = document.getElementById('chatMessages');
    const messages = Array.from(messagesContainer.querySelectorAll('.message')).slice(1); // Excluir mensaje de bienvenida
    
    const chatHistory = messages.map(msg => {
        const isUser = msg.classList.contains('user-message');
        const text = msg.innerHTML.replace(/<strong>.*?<\/strong>\s*/, '').replace(/<br>/g, '\n');
        return {
            text: text,
            type: isUser ? 'user' : 'ai'
        };
    });
    
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
}

// Limpiar historial del chat (para logout)
function clearChatHistory() {
    sessionStorage.removeItem(CHAT_STORAGE_KEY);
}

function sendMessage() {
    if (isProcessing) return;
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) {
        alert('Por favor, escribe un mensaje');
        return;
    }
    
    isProcessing = true;
    document.getElementById('sendBtn').disabled = true;
    document.getElementById('loading').style.display = 'block';
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    input.value = '';
    
    // Obtener la base URL dinámicamente
    const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/') + '/';
    
    // Enviar petición a Gemini
    fetch(baseUrl + 'gemini/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'prompt=' + encodeURIComponent(message)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        
        if (data.success) {
            addMessage(data.response, 'ai');
        } else {
            addMessage('Error: ' + (data.error || 'Error desconocido'), 'ai');
        }
    })
    .catch(error => {
        document.getElementById('loading').style.display = 'none';
        addMessage('Error de conexión: ' + error.message, 'ai');
    })
    .finally(() => {
        isProcessing = false;
        document.getElementById('sendBtn').disabled = false;
    });
}

// Función para agregar mensaje y guardarlo en sessionStorage
function addMessage(text, type) {
    addMessageToDOM(text, type, true);
    saveChatHistory();
}

// Función para agregar mensaje solo al DOM (sin guardar)
function addMessageToDOM(text, type, scroll = true) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (type === 'user' ? 'user-message' : 'ai-message');
    
    const prefix = type === 'user' ? '<strong>Tú:</strong> ' : '<strong>Gemini:</strong> ';
    messageDiv.innerHTML = prefix + text.replace(/\n/g, '<br>');
    
    messagesContainer.appendChild(messageDiv);
    if (scroll) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Función para mostrar/ocultar el chat
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatToggle = document.getElementById('chatToggle');
    
    if (chatContainer.classList.contains('show')) {
        // Ocultar chat
        chatContainer.classList.remove('show');
        chatToggle.classList.remove('chat-open');
        chatToggle.innerHTML = '💬';
        chatToggle.title = 'Abrir Chat con Gemini';
    } else {
        // Mostrar chat
        chatContainer.classList.add('show');
        chatToggle.classList.add('chat-open');
        chatToggle.innerHTML = '✖️';
        chatToggle.title = 'Cerrar Chat';
    }
}

// Inicializar el chat al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que los elementos existen antes de inicializar
    if (document.getElementById('chatMessages')) {
        loadChatHistory();
        
        // Permitir enviar con Enter (Shift+Enter para nueva línea)
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey && !isProcessing) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }
});

// Exponer función para limpiar historial (será llamada en logout)
window.clearChatHistory = clearChatHistory;
