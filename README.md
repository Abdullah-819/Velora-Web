# Velora Web — Full Stack Messenger & Core

## 📐 Architecture Overview
The following diagram illustrates the high-level architecture of the Velora Core system, showcasing the interaction between the React frontend, real-time communication layers, and backend services.

```mermaid
graph TB
    subgraph UI ["🌐 USER INTERFACES"]
        direction LR
        Web["💻 Web Application<br/>(React/Vite)"]
        Mobile["📱 Mobile Responsive<br/>Views"]
        AdminUI["🛠️ Admin Control<br/>Panel"]
    end

    subgraph FE ["🧠 FRONTEND LOGIC (State & Routing)"]
        direction TB
        subgraph State ["State Management"]
            Hooks["⚓ Custom Hooks"]
            Redux["⚡ Redux Toolkit"]
        end
        
        subgraph Routes ["Routing System"]
            Boot["🚀 Bootloaders"]
            Router["🛤️ React Router v7"]
        end
    end

    subgraph Comm ["📡 COMM & SERVICES LAYER"]
        direction TB
        subgraph Transport ["Transport"]
            Axios["🌐 Axios (REST)"]
            Socket["⚡ Socket.io-client"]
        end
        
        subgraph Blocks ["Core Services"]
            AuthSrv["🔐 Auth Service"]
            ChatSrv["💬 Chat Service"]
            AdminSrv["📊 Admin Service"]
        end
    end

    subgraph Data ["☁️ BACKEND & DATA STORAGE"]
        direction TB
        API["⚙️ Velora Core API<br/>(Node/Express)"]
        WS["🔥 Socket.io Server"]
        DB["💾 [(PostgreSQL/MongoDB)]"]
    end

    %% Connections
    Web & Mobile & AdminUI <--> FE
    FE <--> Transport
    Transport <--> Blocks
    Blocks <--> API
    API <--> DB
    Socket <--> WS
    
    %% Styling
    classDef default font-family:Inter,sans-serif;
    classDef ui fill:#e0e7ff,stroke:#6366f1,stroke-width:2px,color:#1e1b4b;
    classDef logic fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#7c2d12;
    classDef comm fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#064e3b;
    classDef data fill:#f8fafc,stroke:#64748b,stroke-width:2px,stroke-dasharray: 5 5,color:#0f172a;

    class UI,Web,Mobile,AdminUI ui;
    class FE,State,Routes,Hooks,Redux,Boot,Router logic;
    class Comm,Transport,Blocks,Axios,Socket,AuthSrv,ChatSrv,AdminSrv comm;
    class Data,API,WS,DB data;
```

---

## 🚀 Project Overview
**Velora Web** is a premium, high-performance communication platform designed for real-time interaction and administrative control. Built with a modern React stack, it offers a cinematic user experience inspired by industry-leading messenger applications.

### ✨ Key Features
- **Real-time Messenger**: Instant messaging with support for favorites, contacts, and community groups.
- **Admin Dashboard**: Comprehensive management suite for monitoring network activity, user metrics, and system status.
- **Status & Updates**: Story-like status updates and channel exploration.
- **Advanced State Management**: Powered by Redux Toolkit for seamless data flow and authentication.
- **Responsive Design**: Fluid transitions and layouts optimized for both desktop and mobile devices.

### 🛠️ Technology Stack
- **Core**: React 19 (Vite)
- **State**: Redux Toolkit + React Hooks
- **Routing**: React Router v7
- **Communication**: Socket.io-client & Axios
- **Styling**: Vanilla CSS (Custom System)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/Abdullah-819/Velora-Web.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file and add your environment variables.
4. Start the development server
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Development
The project follows a feature-based architecture:
- `src/features`: Logic and state for specific features (chat, auth, admin).
- `src/pages`: Main view components.
- `src/services`: Integration with external APIs and WebSockets.
- `src/components`: Shared UI components (Button, LoadingSpinner, EmptyState, Skeleton).

---

## 🤝 Contributing
Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a pull request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Designed with ❤️ by the Velora Development Team*
