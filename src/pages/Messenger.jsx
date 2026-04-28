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
  const [currentTab, setCurrentTab] = useState('messenger')
  const [activeChat, setActiveChat] = useState(initialChats[0])
  const [chats, setChats] = useState(initialChats.map(c => ({ ...c, isFavorite: false, isBlocked: false })))
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)

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

  const toggleFavorite = (id) => {
    setChats(chats.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    setOpenMenuId(null)
  }

  const toggleBlock = (id) => {
    setChats(chats.map(c => c.id === id ? { ...c, isBlocked: !c.isBlocked } : c))
    setOpenMenuId(null)
  }

  const updateContactName = (id) => {
    const newName = window.prompt('Enter new name:')
    if (newName) {
      setChats(chats.map(c => c.id === id ? { ...c, name: newName } : c))
    }
    setOpenMenuId(null)
  }

  const filteredChats = chats.filter(chat => {
    if (currentTab === 'favorites') return chat.isFavorite
    return true
  })

  return (
    <div className="messenger-page">
      <div className="messenger-shell">
        {/* Sidebar */}
        <aside className="messenger-sidebar">
          <div className={`sidebar-icon ${currentTab === 'home' ? 'active' : ''}`} onClick={() => setCurrentTab('home')}>
            <i className="ri-home-line"></i>
          </div>
          <div className={`sidebar-icon ${currentTab === 'messenger' ? 'active' : ''}`} onClick={() => setCurrentTab('messenger')}>
            <i className="ri-messenger-line"></i>
          </div>
          <div className={`sidebar-icon ${currentTab === 'favorites' ? 'active' : ''}`} onClick={() => setCurrentTab('favorites')}>
            <i className="ri-star-line"></i>
          </div>
          <div className={`sidebar-icon ${currentTab === 'contacts' ? 'active' : ''}`} onClick={() => setCurrentTab('contacts')}>
            <i className="ri-contacts-line"></i>
          </div>
          <div className={`sidebar-icon ${currentTab === 'settings' ? 'active' : ''}`} onClick={() => setCurrentTab('settings')}>
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
            <h2>{currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h2>
            <div className="search-bar">
              <i className="ri-search-line"></i>
              <input type="text" placeholder="Search..." />
            </div>
          </header>
          
          <div className="user-list">
            {filteredChats.map(chat => (
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
                  <h4>{chat.name} {chat.isFavorite && <i className="ri-star-fill" style={{ color: '#ffc107', fontSize: '0.8rem' }}></i>}</h4>
                  <p>{chat.isBlocked ? '[Blocked]' : chat.lastMessage}</p>
                </div>
                <div className="user-meta">
                  <span>{chat.time}</span>
                  {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                </div>

                {/* Actions Trigger */}
                <div 
                  className="item-actions-trigger" 
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenMenuId(openMenuId === chat.id ? null : chat.id)
                  }}
                >
                  <i className="ri-more-2-fill"></i>
                  
                  {openMenuId === chat.id && (
                    <div className="context-menu">
                      <div className="context-menu-item" onClick={() => toggleFavorite(chat.id)}>
                        <i className={chat.isFavorite ? 'ri-star-line' : 'ri-star-fill'}></i>
                        {chat.isFavorite ? 'Remove Favorite' : 'Mark Favorite'}
                      </div>
                      <div className="context-menu-item" onClick={() => updateContactName(chat.id)}>
                        <i className="ri-edit-line"></i>
                        Update Name
                      </div>
                      <div className="context-menu-item danger" onClick={() => toggleBlock(chat.id)}>
                        <i className="ri-forbid-line"></i>
                        {chat.isBlocked ? 'Unblock User' : 'Block User'}
                      </div>
                    </div>
                  )}
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
                <p>{activeChat.online ? 'online' : 'offline'}</p>
              </div>
            </div>
            <div className="chat-actions">
              <i className="ri-vidicon-line"></i>
              <i className="ri-phone-line"></i>
              <i className="ri-search-line"></i>
              <i className="ri-more-2-fill"></i>
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
            <div className="input-actions">
              <i className="ri-emotion-happy-line"></i>
              <i className="ri-add-line"></i>
            </div>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Type a message" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <button type="submit" className="send-btn">
              {inputText.trim() ? <i className="ri-send-plane-2-fill"></i> : <i className="ri-mic-line"></i>}
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Messenger
