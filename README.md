# 🏠 vue-fastapi-jwt-auth-dl-four

Last updated: 22-05-2026

A Vue 3 frontend using Pinia for state management and JWT authentication, designed to interact with the FastAPI House Price Prediction API. This project demonstrates a full frontend setup: 

SPA architecture → authentication → form validation → API integration → local development → production build

# FastAPI Backend

- [`House Price Prediction API`](https://github.com/persteenolsen/fastapi-jwt-auth-dl-four) - The backend API using FastAPI, PyTorch, and JWT authentication.

# 🔐 Features

- Vue 3 SPA architecture
- Pinia for global state management
- JWT authentication with secure token storage
- Form validation using Vee-validate + Yup
- API integration with secure REST endpoints
- Development server with Vite
- Production-ready build and preview
- Easy deployment to static hosting

# 🧱 Tech Stack

- Node.js 18.19.1
- Vue 3
- Pinia
- Vee-validate + Yup
- Vite 2.9.16
- ESLint
- VS Code

# 📁 Project Structure

```
.
├── index.html             # SPA entry point
├── package.json           # Node dependencies + scripts
├── vite.config.js         # Vite config
├── src
│   ├── main.js            # Vue app entry point
│   ├── App.vue            # Root component
│   ├── components         # Vue components
│   ├── views              # Pages
│   ├── store              # Pinia stores (JWT auth)
│   ├── services           # API calls
│   └── validation         # Yup/Vee-validate schemas
├── public                 # Static assets
└── .env                   # Environment variables (API URL)
```

# ⚙️ Installation

git clone https://github.com/persteenolsen/vue-fastapi-jwt-auth-dl-four.git
cd vue-fastapi-jwt-auth-dl-four
npm install

Verify setup:

npm run dev

Open the app in the browser:

http://localhost:3000

# 🚀 Development Server

- Start with `npm run dev`
- Accessible at `http://localhost:3000`

# 📦 Production Build

- Run `npm run build` to create a production build

# 👀 Preview Production Build

- Run `npm run preview`
- Preview the production build locally at `http://localhost:5050`

# 🔐 Environment Variables (.env)

VITE_API_URL=http://127.0.0.1:8000

# 🧪 Usage

1. Start the FastAPI backend
2. Start the Vue frontend (`npm run dev`)
3. Register/login through the SPA
4. Enter house features in the prediction form
5. Submit to receive predicted house price from the API

# 📡 API Integration

- POST `/login` → returns JWT token
- GET/POST to `/predict` using JWT for authentication
- Token stored in Pinia store and localStorage for session persistence

# 🧠 Key Design Features

- Global Pinia store for JWT auth
- Secure API calls with Axios interceptors
- Form validation with Vee-validate + Yup
- Environment-based API URL configuration
- SPA routing for authenticated and public pages

# 👨‍💻 Author

Built as a frontend SPA demonstrating secure JWT authentication, state management with Pinia, and integration with a production-style FastAPI ML API backend.