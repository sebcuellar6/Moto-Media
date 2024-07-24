import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
    domain="dev-8tsfcfzo7uqf0hje.us.auth0.com"
    clientId="6zPJd4lDp5bqrNJBQ7NXeY7L9OZHNNLz"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </BrowserRouter>
  </React.StrictMode>
)
