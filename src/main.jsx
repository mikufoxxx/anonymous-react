import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyles } from '@mui/material';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles
        styles={{
          'html, body': {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden', // 防止出现滚动条
          },
          '#root': {
            width: '100%',
            height: '100%',
          },
        }}
    />
    <ToastContainer />
    <App/>
  </StrictMode>,
)
