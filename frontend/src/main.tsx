import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

console.log('🚀 Starting app...')

const rootElement = document.getElementById('root')
console.log('Root element found:', !!rootElement, rootElement)

if (!rootElement) {
  const errorMsg = 'Root element #root not found!'
  console.error('❌', errorMsg)
  document.body.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace; white-space: pre;">${errorMsg}\n\nDOM Content:\n${document.body.innerHTML}</div>`
} else {
  try {
    console.log('📦 Creating React root')
    const root = createRoot(rootElement)
    console.log('✅ React root created')

    console.log('🎨 Rendering App component')
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('✅ App component rendered')
  } catch (error) {
    const errorMsg = String(error)
    console.error('❌ React render error:', error)
    document.body.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace; white-space: pre;">React Error:\n${errorMsg}\n\nStack:\n${error instanceof Error ? error.stack : 'N/A'}</div>`
  }
}
