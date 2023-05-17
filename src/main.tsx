import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import './index.css'
import  { Suspense } from 'react' 
import Layout from "./components/UI/Layout.tsx";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
 
    <Suspense fallback={null}>
      {/* <App/> */}
      <Layout>
        <App></App>
      </Layout>
      </Suspense> 
  </React.StrictMode>,
)
