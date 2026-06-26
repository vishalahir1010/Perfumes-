import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemProvider } from './Pages/ThemContext.jsx';

createRoot(document.getElementById('root')).render(
 <ThemProvider>
    <App />
  </ThemProvider>
)
