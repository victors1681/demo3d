import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import  { Suspense } from 'react' 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
 
    <Suspense fallback={null}>
      <App/>
      </Suspense> 
  </React.StrictMode>,
)
