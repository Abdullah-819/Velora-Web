import { useState } from 'react'
import '../styles/messenger.css'

const initialChats = [
  {
    id: 1,
    name: 'User Name',
    avatar: 'UN',
    lastMessage: 'Lorem ipsum dolor sit amet...',
    time: '23:01',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Sarah Connor',
    avatar: 'SC',
    lastMessage: 'I\'ll be back.',
    time: '22:45',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'John Doe',
    avatar: 'JD',
    lastMessage: 'See you tomorrow!',
    time: '21:15',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'Jane Smith',
    avatar: 'JS',
    lastMessage: 'Thanks for the help!',
    time: '20:30',
    unread: 0,
    online: true,
  },
]

const initialMessages = [
  { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', time: '22:01', type: 'received' },
  { id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '22:11', type: 'received' },
  { id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', time: '22:15', type: 'received' },
  { id: 4, text: 'Lorem ipsum dolor sit.', time: '22:25', type: 'sent' },
  { id: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.', time: '22:32', type: 'received' },
]

function Messenger() {
  const [activeChat, setActiveChat] = useState(initialChats[0])
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
    }

    setMessages([...messages, newMessage])
    setInputText('')
  }

  return (
    <div className="messenger-page">
      <div className="messenger-shell">
        {/* Sidebar */}
        <aside className="messenger-sidebar">
          <div className="sidebar-icon active">
            <i className="ri-home-line"></i>
          </div>
          <div className="sidebar-icon">
            <i className="ri-messenger-line"></i>
          </div>
          <div className="sidebar-icon">
            <i className="ri-star-line"></i>
          </div>
          <div className="sidebar-icon">
            <i className="ri-contacts-line"></i>
          </div>
          <div className="sidebar-icon">
            <i className="ri-settings-3-line"></i>
          </div>
          
          <div className="sidebar-bottom">
            <div className="sidebar-icon">
              <i className="ri-logout-box-line"></i>
            </div>
          </div>
        </aside>

        {/* Panel / User List */}
        <section className="messenger-panel">
          <header className="panel-header">
            <h2>Messages</h2>
            <div className="search-bar">
              <i className="ri-search-line"></i>
              <input type="text" placeholder="Search conversations..." />
            </div>
          </header>
          
          <div className="user-list">
            {initialChats.map(chat => (
              <div 
                key={chat.id} 
                className={`user-item ${activeChat.id === chat.id ? 'active' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="user-avatar" style={{ background: chat.online ? 'linear-gradient(135deg, #6557ff, #4e44cc)' : '' }}>
                  {chat.avatar}
                  {chat.online && <span className="status-dot"></span>}
                </div>
                <div className="user-info">
                  <h4>{chat.name}</h4>
                  <p>{chat.lastMessage}</p>
                </div>
                <div className="user-meta">
                  <span>{chat.time}</span>
                  {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chat Window */}
        <main className="chat-window">
          <header className="chat-header">
            <div className="chat-user-profile">
              <div className="user-avatar">{activeChat.avatar}</div>
              <div>
                <h3>{activeChat.name}</h3>
                <p>{activeChat.online ? 'Active Now' : 'Offline'}</p>
              </div>
            </div>
            <div className="chat-actions">
              <i className="ri-phone-line"></i>
              <i className="ri-vidicon-line"></i>
              <i className="ri-information-line"></i>
            </div>
          </header>

          <div className="message-list">
            {messages.map(msg => (
              <div key={msg.id} className={`message-item ${msg.type}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
                <div className="message-time">
                  {msg.time}
                  {msg.type === 'sent' && <i className="ri-check-double-line"></i>}
                </div>
              </div>
            ))}
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <div className="input-wrapper">
              <div className="input-actions">
                <i className="ri-add-line"></i>
              </div>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="input-actions">
                <i className="ri-emotion-happy-line"></i>
                <i className="ri-image-line"></i>
              </div>
            </div>
            <button type="submit" className="send-btn">
              <i className="ri-send-plane-fill"></i>
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Messenger
