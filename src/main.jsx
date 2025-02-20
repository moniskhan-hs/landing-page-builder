import { CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { FileUploadProvider } from './context/FileManager.jsx'
import './index.css'
import { store } from './redux/store.js'
import { theme } from './styles/theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FileUploadProvider>
          <App />
        </FileUploadProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
