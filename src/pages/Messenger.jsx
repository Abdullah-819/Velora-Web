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
  const [editingContact, setEditingContact] = useState(null)
  const [newName, setNewName] = useState('')
  const [userProfile, setUserProfile] = useState({
    name: 'Abdullah',
    email: 'user@velora.com',
    avatar: 'A'
  })

  const handleSelectChat = (chat) => {
    setActiveChat(chat)
    setChats(chats.map(c => c.id === chat.id ? { ...c, unread: 0 } : c))
  }

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

  const startEditing = (contact) => {
    setEditingContact(contact)
    setNewName(contact.name)
    setOpenMenuId(null)
  }

  const saveNewName = () => {
    if (newName.trim()) {
      setChats(chats.map(c => c.id === editingContact.id ? { ...c, name: newName.trim() } : c))
    }
    setEditingContact(null)
  }

  const updateProfileName = () => {
    const updatedName = window.prompt('Update your profile name:', userProfile.name)
    if (updatedName) {
      setUserProfile({ ...userProfile, name: updatedName })
    }
  }

  const blockedUsers = chats.filter(c => c.isBlocked)

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
                onClick={() => handleSelectChat(chat)}
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
                      <div className="context-menu-item" onClick={() => startEditing(chat)}>
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

        {/* Modal for editing contact name */}
        {editingContact && (
          <div className="modal-overlay" onClick={() => setEditingContact(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Update Name</h3>
              <p>Change the display name for this contact.</p>
              <input
                className="modal-input"
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                autoFocus
                onKeyDown={e => e.key === 'Enter' && saveNewName()}
              />
              <div className="modal-actions">
                <button className="modal-btn cancel" onClick={() => setEditingContact(null)}>Cancel</button>
                <button className="modal-btn save" onClick={saveNewName}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area: Chat or Settings */}
        {currentTab === 'settings' ? (
          <main className="chat-window settings-page">
            <header className="chat-header">
              <h3>Settings</h3>
            </header>

            <div className="settings-content">
              <section className="settings-section">
                <div className="section-header">
                  <i className="ri-user-settings-line"></i>
                  <h4>General</h4>
                </div>
                <div className="setting-item" onClick={updateProfileName}>
                  <div className="setting-label">
                    <span>Display Name</span>
                    <p>{userProfile.name}</p>
                  </div>
                  <i className="ri-arrow-right-s-line"></i>
                </div>
              </section>

              <section className="settings-section">
                <div className="section-header">
                  <i className="ri-shield-user-line"></i>
                  <h4>Privacy</h4>
                </div>
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Blocked Contacts</span>
                    <p>{blockedUsers.length} users blocked</p>
                  </div>
                  <i className="ri-arrow-right-s-line"></i>
                </div>
                {blockedUsers.length > 0 && (
                  <div className="blocked-list">
                    {blockedUsers.map(user => (
                      <div key={user.id} className="blocked-user-item">
                        <span>{user.name}</span>
                        <button onClick={() => toggleBlock(user.id)}>Unblock</button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="settings-section">
                <div className="section-header">
                  <i className="ri-notification-3-line"></i>
                  <h4>Notifications</h4>
                </div>
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Push Notifications</span>
                    <p>Enabled</p>
                  </div>
                  <div className="toggle-switch active"></div>
                </div>
              </section>

              <section className="settings-section">
                <div className="section-header">
                  <i className="ri-image-circle-line"></i>
                  <h4>Profile Photo</h4>
                </div>
                <div className="profile-upload-box">
                  <div className="current-avatar">{userProfile.avatar}</div>
                  <div className="upload-info">
                    <span>Change Profile Photo</span>
                    <p>Cloudinary integration pending backend</p>
                  </div>
                </div>
              </section>
            </div>
          </main>
        ) : (
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
