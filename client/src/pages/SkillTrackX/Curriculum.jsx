import React from 'react'

const Curriculum = ({ modules = [] }) => {
  return (
    <div className="stx-curriculum">
      {modules.map((m, i) => (
        <div key={i} className="stx-module">
          <strong>{m.title}</strong>
          <div className="stx-module-desc">{m.summary}</div>
          {m.lessons && (
            <ol className="stx-lessons">
              {m.lessons.map((l, idx) => (
                <li key={idx}>{l}</li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  )
}

export default Curriculum
