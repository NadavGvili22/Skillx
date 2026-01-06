import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Insightx from './pages/Insightx'
import SkillTrackX from './pages/SkillTrackX/index'
import Verifyx from './pages/Verifyx'

export default function App() {
  const location = useLocation()
  const isFullPage = location.pathname.startsWith('/insightx') || location.pathname.startsWith('/verifyx')

  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif', padding: 20 }}>
      {!isFullPage && (
        <header style={{ marginBottom: 20 }}>
          <h1>Skillx Template</h1>
          <nav>
            <Link to="/insightx" style={{ marginRight: 10 }}>Insightx</Link>
            <Link to="/verifyx">Verifyx</Link>
            <Link to="/SkillTrackX"> SkillTrackX </Link>

          </nav>
        </header>
      )}

      <main>
        <Routes>
          <Route path="/insightx" element={<Insightx />} />
          <Route path="/verifyx" element={<Verifyx />} />
          <Route path="/SkillTrackX" element={<SkillTrackX />} />

          <Route path="/" element={<div>Welcome — open /insightx or /verifyx</div>} />
        </Routes>
      </main>
    </div>
  )
}
