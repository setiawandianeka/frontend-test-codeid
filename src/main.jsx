import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import store from "./store";
import ToastNotify from "@/components/ToastNotify";

localStorage.theme = 'light'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastNotify />
      <App />
    </Provider>
  </React.StrictMode>,
)
