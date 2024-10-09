"use client";

import { useEffect, useState } from 'react';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/mensagens');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar as mensagens');
        }

        const data = await response.json();

        if (data?.messages) {
          setMessages(data.messages);
        } else {
          setError('Nenhuma mensagem encontrada');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    // Atualiza as mensagens a cada 10 segundos
    const intervalId = setInterval(fetchMessages, 10000);
    fetchMessages();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {error ? (
        <p>Erro: {error}</p>
      ) : (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.texto} - {new Date(message.dataRecebida).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
