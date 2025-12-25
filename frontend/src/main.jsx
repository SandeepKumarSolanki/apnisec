import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#1a1a2e',
                            color: '#fff',
                            border: '1px solid #252545'
                        },
                        success: {
                            iconTheme: {
                                primary: '#00ff88',
                                secondary: '#1a1a2e'
                            }
                        },
                        error: {
                            iconTheme: {
                                primary: '#ff4757',
                                secondary: '#1a1a2e'
                            }
                        }
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
