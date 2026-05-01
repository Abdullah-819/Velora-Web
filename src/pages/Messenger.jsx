import { useState } from 'react'
import '../styles/messenger.css'

const initialChats = [
  { id: 1, name: 'Abdullah Rana', avatar: 'AR', lastMessage: 'Welcome to Velora Messenger!', time: '12:00 PM', unread: 0, online: true },
  { id: 2, name: 'Velora Dev', avatar: 'VD', lastMessage: 'The new theme is looking great!', time: '1:30 PM', unread: 0, online: true },
  { id: 3, name: 'Velora Dev Team', avatar: 'VT', lastMessage: 'Deployment successful.', time: '2:45 PM', unread: 0, online: false },
  { id: 4, name: 'SQA Team', avatar: 'ST', lastMessage: 'Regression testing in progress.', time: '3:15 PM', unread: 0, online: true },
  { id: 5, name: 'HR Team', avatar: 'HT', lastMessage: 'Please check your recent updates.', time: '5:00 PM', unread: 0, online: false },
]

const initialMessages = [
  { id: 1, chatId: 1, text: 'Hello Abdullah! Welcome to the new Velora interface.', time: '11:55 AM', type: 'received' },
  { id: 2, chatId: 1, text: 'Welcome to Velora Messenger!', time: '12:00 PM', type: 'received' },
  { id: 3, chatId: 2, text: 'The new theme is looking great!', time: '1:30 PM', type: 'received' },
  { id: 4, chatId: 3, text: 'Deployment successful.', time: '2:45 PM', type: 'received' },
  { id: 5, chatId: 4, text: 'Regression testing in progress.', time: '3:15 PM', type: 'received' },
  { id: 6, chatId: 5, text: 'Please check your recent updates.', time: '5:00 PM', type: 'received' },
]


function Messenger() {
  const [currentTab, setCurrentTab] = useState('messenger')
  const [activeChat, setActiveChat] = useState(null)
  const [chats, setChats] = useState(initialChats.map(c => ({ ...c, isFavorite: false, isBlocked: false })))
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [editingContact, setEditingContact] = useState(null)
  const [newName, setNewName] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showPlusMenu, setShowPlusMenu] = useState(false)
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
    if (!inputText.trim() || !activeChat) return

    const newMessage = {
      id: messages.length + 1,
      chatId: activeChat.id,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
    }

    setMessages([...messages, newMessage])
    setInputText('')
    setShowEmojiPicker(false)
    setShowPlusMenu(false)
  }

  const addEmoji = (emoji) => {
    setInputText(prev => prev + emoji)
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

  const filteredChats = chats.filter(chat => {
    if (currentTab === 'favorites') return chat.isFavorite
    if (filter === 'unread') return chat.unread > 0
    if (filter === 'favorites') return chat.isFavorite
    if (filter === 'groups') return chat.isGroup
    return true
  })

  return (
    <div className="messenger-page">
      <div className="messenger-shell">
        {/* Sidebar (Desktop) */}
        <aside className="messenger-sidebar desktop-only">
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

        {/* Panel / User List OR Settings List */}
        <section className={`messenger-panel ${activeChat && currentTab !== 'settings' ? 'mobile-hidden' : ''}`}>
          <header className="panel-header">
            {/* Mobile Header Elements */}
            <div className="header-top mobile-only">
              <div className="header-left">
                <div className="more-btn"><i className="ri-more-2-fill"></i></div>
              </div>
              <div className="header-actions">
                <i className="ri-camera-line"></i>
                {currentTab === 'messenger' && <div className="add-btn"><i className="ri-add-line"></i></div>}
                {currentTab === 'calls' && <div className="add-btn"><i className="ri-add-line"></i></div>}
                {currentTab === 'communities' && <div className="add-btn"><i className="ri-add-line"></i></div>}
              </div>
            </div>

            {/* Desktop Header Elements */}
            <h2 className="desktop-only">{currentTab === 'settings' ? 'Settings' : currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h2>
            <h1 className="mobile-only section-title">{currentTab === 'messenger' ? 'Chats' : currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h1>

            {(currentTab === 'messenger' || currentTab === 'settings') && (
              <div className="search-bar">
                <i className="ri-search-line"></i>
                <input type="text" placeholder={currentTab === 'settings' ? "Search" : "Ask Meta AI or Search"} />
              </div>
            )}

            {currentTab === 'messenger' && (
              <div className="filter-pills mobile-only">
                <div className={`pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</div>
                <div className={`pill ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread</div>
                <div className={`pill ${filter === 'favorites' ? 'active' : ''}`} onClick={() => setFilter('favorites')}>Favorites</div>
                <div className={`pill ${filter === 'groups' ? 'active' : ''}`} onClick={() => setFilter('groups')}>Groups</div>
              </div>
            )}
          </header>

          <div className="user-list">
            {currentTab === 'messenger' && (
              <>
                <div className="archived-section mobile-only">
                  <i className="ri-archive-line"></i>
                  <span>Archived</span>
                  <span className="archived-count">11</span>
                </div>
                {filteredChats.map(chat => (
                  <div
                    key={chat.id}
                    className={`user-item ${activeChat && activeChat.id === chat.id ? 'active' : ''}`}
                    onClick={() => handleSelectChat(chat)}
                  >
                    <div className="user-avatar" style={{ background: chat.online ? 'linear-gradient(135deg, #6557ff, #4e44cc)' : '' }}>
                      {chat.avatar}
                      {chat.online && <span className="status-dot"></span>}
                    </div>
                    <div className="user-info">
                      <h4>{chat.name} {chat.isFavorite && <i className="ri-star-fill" style={{ color: '#ffc107', fontSize: '0.8rem' }}></i>}</h4>
                      <p>{chat.lastMessage}</p>
                    </div>
                    <div className="user-meta">
                      <span className={chat.unread > 0 ? 'unread-time' : ''}>{chat.time}</span>
                      {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                    </div>
                  </div>
                ))}
              </>
            )}

            {currentTab === 'updates' && (
              <div className="updates-section">
                <div className="updates-header">
                  <h3>Status</h3>
                  <div className="updates-actions">
                    <i className="ri-camera-line"></i>
                    <i className="ri-pencil-line"></i>
                  </div>
                </div>
                <div className="status-tray">
                  <div className="status-item add">
                    <div className="status-avatar">
                      <i className="ri-user-fill"></i>
                      <div className="add-status-badge">+</div>
                    </div>
                    <span>Add status</span>
                  </div>
                  <div className="status-item">
                    <div className="status-avatar viewed">
                      <div className="avatar-img">IK</div>
                    </div>
                    <span>Ikram 💀</span>
                  </div>
                  <div className="status-item">
                    <div className="status-avatar unviewed">
                      <div className="avatar-img">AH</div>
                    </div>
                    <span>Abdul Haq Ac</span>
                  </div>
                </div>
                <div className="channels-section">
                  <div className="channels-header">
                    <h3>Channels</h3>
                    <button className="explore-btn">Explore</button>
                  </div>
                  <div className="channel-item">
                    <div className="channel-avatar"><i className="ri-newspaper-line"></i></div>
                    <div className="channel-info">
                      <h4>The New York Times</h4>
                      <p>The Champions League semifinals get underway today...</p>
                    </div>
                    <div className="channel-meta">
                      <span>8:49 PM</span>
                      <span className="unread-count">999+</span>
                    </div>
                  </div>
                  <div className="channel-item">
                    <div className="channel-avatar"><i className="ri-graduation-cap-line"></i></div>
                    <div className="channel-info">
                      <h4>PakEduCareer Educational Updates</h4>
                      <p>Clinical Trials Summit of Pakistan (CTSP) 2026...</p>
                    </div>
                    <div className="channel-meta">
                      <span>7:52 PM</span>
                      <span className="unread-count">15</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'calls' && (
              <div className="calls-section">
                <div className="calls-top-actions">
                  <div className="call-action">
                    <div className="action-icon"><i className="ri-phone-line"></i></div>
                    <span>Call</span>
                  </div>
                  <div className="call-action">
                    <div className="action-icon"><i className="ri-calendar-line"></i></div>
                    <span>Schedule</span>
                  </div>
                  <div className="call-action">
                    <div className="action-icon"><i className="ri-keyboard-line"></i></div>
                    <span>Keypad</span>
                  </div>
                </div>
                <h3>Recent</h3>
                <div className="call-item">
                  <div className="user-avatar">MA</div>
                  <div className="call-info">
                    <h4>M Ahmed New</h4>
                    <p><i className="ri-arrow-right-up-line"></i> Outgoing</p>
                  </div>
                  <div className="call-meta">
                    <span>8:52 PM</span>
                    <i className="ri-information-line"></i>
                  </div>
                </div>
                <div className="call-item missed">
                  <div className="user-avatar">AA</div>
                  <div className="call-info">
                    <h4>Abd Asif</h4>
                    <p><i className="ri-arrow-left-down-line"></i> Missed</p>
                  </div>
                  <div className="call-meta">
                    <span>12:44 PM</span>
                    <i className="ri-information-line"></i>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'communities' && (
              <div className="communities-section">
                <div className="community-group">
                  <div className="group-header">
                    <h4>SOFTEC'26</h4>
                    <button className="see-all">See all</button>
                  </div>
                  <div className="community-item">
                    <div className="item-icon"><i className="ri-notification-3-line"></i></div>
                    <div className="item-content">
                      <p>New groups "SOFTEC'26 Cybersecurity Participants" added</p>
                    </div>
                    <div className="item-dot"></div>
                  </div>
                  <div className="community-item">
                    <div className="item-icon"><i className="ri-megaphone-line"></i></div>
                    <div className="item-content">
                      <h4>Announcements</h4>
                      <p>~ ayesha: ROBORUMBLE STARTING SHORTLY</p>
                    </div>
                    <div className="item-meta">19/04/2026</div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'settings' && (
              <div className="settings-section">
                <div className="profile-hero">
                  <div className="profile-bubble">
                    <div className="quote-bubble">Silent tear hold's the loudest pain ❤️</div>
                    <div className="profile-avatar-large">{userProfile.avatar}</div>
                  </div>
                  <h2>{userProfile.name}</h2>
                </div>

                <div className="settings-card">
                  <div className="settings-item">
                    <i className="ri-archive-line"></i>
                    <span>Lists</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                  <div className="settings-item">
                    <i className="ri-star-line"></i>
                    <span>Starred</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                  <div className="settings-item">
                    <i className="ri-megaphone-line"></i>
                    <span>Broadcast messages</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                  <div className="settings-item">
                    <i className="ri-computer-line"></i>
                    <span>Linked devices</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                </div>

                <div className="settings-card">
                  <div className="settings-item">
                    <i className="ri-key-line"></i>
                    <span>Account</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                  <div className="settings-item">
                    <i className="ri-lock-line"></i>
                    <span>Privacy</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                  <div className="settings-item">
                    <i className="ri-chat-3-line"></i>
                    <span>Chats</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                </div>
              </div>
            )}
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
          <main className="chat-window settings-detail">
            <div className="settings-empty-state">
              <div className="empty-icons">
                <div className="empty-box"><i className="ri-file-list-3-line"></i><span>Send document</span></div>
                <div className="empty-box"><i className="ri-user-add-line"></i><span>Add contact</span></div>
                <div className="empty-box"><i className="ri-shining-line"></i><span>Ask Meta AI</span></div>
              </div>
            </div>
          </main>
        ) : (
          <main className={`chat-window ${!activeChat ? 'mobile-hidden' : ''}`}>
            {activeChat ? (
              <>
                <header className="chat-header">
                  <div className="chat-user-profile">
                    <div className="back-btn-container" onClick={() => {
                      setActiveChat(null)
                      setOpenMenuId(null)
                    }}>
                      <i className="ri-arrow-left-line"></i>
                      {chats.some(c => c.unread > 0) && <span className="unread-back-badge">38</span>}
                    </div>
                    <div className="user-avatar">{activeChat.avatar}</div>
                    <div className="chat-user-info">
                      <h3>{activeChat.name}</h3>
                      <p>{activeChat.online ? 'online' : 'offline'}</p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <i className="ri-vidicon-line"></i>
                    <i className="ri-phone-line"></i>
                  </div>
                </header>

                <div className="message-list">
                  {messages.filter(msg => msg.chatId === activeChat.id).map(msg => (
                    <div key={msg.id} className={`message-item ${msg.type}`}>
                      <div className="message-bubble">
                        {msg.text}
                        <div className="message-time">
                          {msg.time}
                          {msg.type === 'sent' && <i className="ri-check-double-line"></i>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="chat-input-area" onSubmit={handleSendMessage}>
                  {isRecording ? (
                    <div className="recording-ui">
                      <i className="ri-mic-fill recording-mic"></i>
                      <span className="recording-timer">0:01</span>
                      <span className="slide-to-cancel">Slide to cancel <i className="ri-arrow-left-s-line"></i></span>
                      <button type="button" className="send-btn stop" onClick={() => setIsRecording(false)}>
                        <i className="ri-send-plane-2-fill"></i>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="input-actions">
                        <div className="action-wrapper">
                          <i
                            className={`ri-emotion-happy-line ${showEmojiPicker ? 'active' : ''}`}
                            onClick={() => {
                              setShowEmojiPicker(!showEmojiPicker)
                              setShowPlusMenu(false)
                            }}
                          ></i>
                          {showEmojiPicker && (
                            <div className="emoji-picker-popup">
                              {['❤️', '😂', '😮', '😢', '🔥', '👏', '👍', '🙏', '✨', '💯', '📍', '✅'].map(emoji => (
                                <span key={emoji} onClick={() => addEmoji(emoji)}>{emoji}</span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="action-wrapper">
                          <i
                            className={`ri-add-line ${showPlusMenu ? 'active' : ''}`}
                            onClick={() => {
                              setShowPlusMenu(!showPlusMenu)
                              setShowEmojiPicker(false)
                            }}
                          ></i>
                          {showPlusMenu && (
                            <div className="plus-menu-popup">
                              <div className="plus-menu-item media" onClick={() => { alert('Media selected'); setShowPlusMenu(false); }}>
                                <div className="plus-icon-box"><i className="ri-file-list-3-line"></i></div>
                                <span>Media</span>
                              </div>
                              <div className="plus-menu-item photos" onClick={() => { alert('Photos selected'); setShowPlusMenu(false); }}>
                                <div className="plus-icon-box"><i className="ri-image-line"></i></div>
                                <span>Photos</span>
                              </div>
                              <div className="plus-menu-item contact" onClick={() => { alert('Contact selected'); setShowPlusMenu(false); }}>
                                <div className="plus-icon-box"><i className="ri-user-add-line"></i></div>
                                <span>Contact</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          placeholder="Type a message"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                        />
                      </div>
                      <button
                        type={inputText.trim() ? "submit" : "button"}
                        className="send-btn"
                        onMouseDown={() => !inputText.trim() && setIsRecording(true)}
                        onTouchStart={() => !inputText.trim() && setIsRecording(true)}
                      >
                        {inputText.trim() ? <i className="ri-send-plane-2-fill"></i> : <i className="ri-mic-line"></i>}
                      </button>
                    </>
                  )}
                </form>
              </>
            ) : (
              <div className="welcome-screen">
                <div className="welcome-content">
                  <div className="welcome-logo">
                    <i className="ri-messenger-fill"></i>
                  </div>
                  <h1>Velora Messenger</h1>
                  <p>Connect with your world through seamless, encrypted messaging.<br />Your conversations are synchronized across all your devices.</p>
                  <div className="encryption-notice">
                    <i className="ri-lock-fill"></i>
                    <span>End-to-end encrypted</span>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

        {/* Mobile Navigation Bar - Hidden when chat is active */}
        <nav className={`mobile-nav mobile-only ${activeChat ? 'hidden' : ''}`}>
          <div className={`nav-item ${currentTab === 'updates' ? 'active' : ''}`} onClick={() => setCurrentTab('updates')}>
            <i className="ri-donut-chart-line"></i>
            <span>Updates</span>
          </div>
          <div className={`nav-item ${currentTab === 'calls' ? 'active' : ''}`} onClick={() => setCurrentTab('calls')}>
            <i className="ri-phone-line"></i>
            <span>Calls</span>
          </div>
          <div className={`nav-item ${currentTab === 'communities' ? 'active' : ''}`} onClick={() => setCurrentTab('communities')}>
            <i className="ri-group-line"></i>
            <span>Communities</span>
          </div>
          <div className={`nav-item ${currentTab === 'messenger' ? 'active' : ''}`} onClick={() => setCurrentTab('messenger')}>
            <div className="nav-badge">38</div>
            <i className="ri-chat-3-fill"></i>
            <span>Chats</span>
          </div>
          <div className={`nav-item ${currentTab === 'settings' ? 'active' : ''}`} onClick={() => setCurrentTab('settings')}>
            <div className="nav-avatar">{userProfile.avatar}</div>
            <span>You</span>
          </div>
        </nav>

        {/* Meta AI FAB - Hidden when chat is active */}
        {!activeChat && (
          <div className="meta-ai-fab mobile-only">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta AI" style={{ width: '24px', filter: 'brightness(0) invert(1)' }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Messenger
