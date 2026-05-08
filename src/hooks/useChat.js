import { useState } from 'react';

/**
 * useChat Hook
 * Encapsulates chat-related state and logic.
 * 
 * @param {Array} initialChats
 * @param {Array} initialMessages
 */
function useChat(initialChats, initialMessages) {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState(initialChats.map(c => ({ ...c, isFavorite: false, isBlocked: false })));
  const [messages, setMessages] = useState(initialMessages);

  const selectChat = (chat) => {
    setActiveChat(chat);
    setChats(prevChats => prevChats.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
  };

  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      chatId,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const toggleFavorite = (id) => {
    setChats(prevChats => prevChats.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const toggleBlock = (id) => {
    setChats(prevChats => prevChats.map(c => c.id === id ? { ...c, isBlocked: !c.isBlocked } : c));
  };

  return {
    activeChat,
    setActiveChat,
    chats,
    setChats,
    messages,
    selectChat,
    sendMessage,
    toggleFavorite,
    toggleBlock,
  };
}

export default useChat;
