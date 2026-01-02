import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themeprovider } from './context/ThemeContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode >
    <SearchProvider>
    <Themeprovider>
      <App />
    </Themeprovider> 
    </SearchProvider>
  </StrictMode>,
)
