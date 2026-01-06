import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Insightx from './pages/Insightx'
import Verifyx from './pages/Verifyx'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif', padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>Skillx Template</h1>
        <nav>
          <Link to="/insightx" style={{ marginRight: 10 }}>Insightx</Link>
          <Link to="/verifyx">Verifyx</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/insightx" element={<Insightx />} />
          <Route path="/verifyx" element={<Verifyx />} />
          <Route path="/" element={<div>Welcome — open /insightx or /verifyx</div>} />
        </Routes>
      </main>
    </div>
  )
}
