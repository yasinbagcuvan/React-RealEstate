import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/style/index.scss'
import { DataProvider } from './context/DataContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(


  <AuthProvider>
    <App />
  </AuthProvider>

)
