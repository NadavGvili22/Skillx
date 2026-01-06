import React from 'react'

const SkillCard = ({ skill }) => {
  return (
    <div className="stx-card">
      <h4 className="stx-card-title">{skill.title}</h4>
      <div className="stx-card-meta">Level: {skill.level}</div>
      <p className="stx-card-desc">{skill.description}</p>
      {skill.topics && (
        <ul className="stx-topics">
          {skill.topics.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SkillCard
