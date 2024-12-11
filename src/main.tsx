import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { makeServer } from './server.ts'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from './theme/ThemeProvider.tsx'

makeServer()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider >
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
