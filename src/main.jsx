import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import UserContextProvider from './components/web/context/User.jsx';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <UserContextProvider>
  <QueryClientProvider client={queryClient}>
  <App />
  <ToastContainer />
  </QueryClientProvider>
  </UserContextProvider>
  </>
)
