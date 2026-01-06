import React from 'react'
import { Link } from 'react-router-dom'
import SkillCard from './SkillCard'
import Curriculum from './Curriculum'
import { course } from './data'
import './styles.css'

const SkillTrackX = ()=>{
    return (
        <div className="stx-root">
            <header className="stx-header">
                <h2>{course.title}</h2>
                <p className="stx-sub">{course.subtitle}</p>
                <div className="stx-actions">
                    <a className="stx-btn" href="/SkillTrackX.pdf" target="_blank" rel="noreferrer">Download PDF</a>
                    <Link className="stx-link" to="/verifyx">Verify</Link>
                </div>
            </header>

            <section className="stx-main">
                <aside className="stx-left">
                    <h3>Overview</h3>
                    <p>{course.overview}</p>

                    <h4>Curriculum</h4>
                    <Curriculum modules={course.curriculum} />
                </aside>

                <section className="stx-right">
                    <h3>Skills & Topics</h3>
                    <div className="stx-grid">
                        {course.skills.map((s, i) => (
                            <SkillCard key={i} skill={s} />
                        ))}
                    </div>
                </section>
            </section>
        </div>
    )
}

export default SkillTrackX