import { Link } from 'react-router-dom'

export default function Verifyx() {
  return (
    <section style={{ minHeight: '100vh', padding: 24, boxSizing: 'border-box' }}>
      <h2>Verifyx</h2>
      <p>This is the <strong>/verifyx</strong> page.</p>
      <p>Replace this with your verification UI.</p>

      <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: 20 }}>
        <Link to="/">
          <button style={{ padding: '8px 14px', fontSize: 14 }}>Return</button>
        </Link>
      </div>
    </section>
  )
}
