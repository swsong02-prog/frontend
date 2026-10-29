import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 2026-10-29 리디자인: 새 디자인 시스템만 불러온다.
// (이전 index.css · allwhite.css · whiteblack.css는 파일만 남겨두고 불러오지 않음)
import './styles/tokens.css'
import './styles/components.css'
import './styles/shell.css'
import './styles/pages.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
