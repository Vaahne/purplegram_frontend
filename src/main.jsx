import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider.jsx';
import { CookiesProvider } from 'react-cookie';
import store from './redux/store.jsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <AppProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </AppProvider>
      </Provider>
    </CookiesProvider>
  </StrictMode>,
)
