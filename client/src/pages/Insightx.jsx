import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const experiences = [
  {
    id: 1,
    name: 'התנסות א',
    preservationSummary: 'המשתתפים שומרים על אנרגיה ועבודת צוות טובה.',
    improvementSummary: 'יש להגדיר תפקידים ולתת זמן תרגול נוסף.',
    cadetFeedback: {
      preservation: [
        { text: 'המשתתפים שמרו על אנרגיה גבוהה לאורך הפעילות', tag: 'אנרגיה' },
        { text: 'העבודה בקבוצות היתה מסודרת וברורה', tag: 'עבודה קבוצתית' },
        { text: 'הצוערים אהבו את שיטת הלימוד המעורבת', tag: 'שיטה' }
      ],
      improvement: [
        { text: 'צריך קביעת תפקידים ברורה יותר', tag: 'תפקידים' },
        { text: 'לשפר את זמן התרגול הפרטני', tag: 'זמן' },
        { text: 'צריך יותר משימות פרקטיות', tag: 'מעשי' }
      ],
      generalSummary: 'צוערים מרוצים מהשיטה, ומבקשים עוד תרגול מעשי.'
    },
    commanderFeedback: {
      preservation: [ { text: 'שמירה על סדר ודיוק במהלך התרגילים', tag: 'סדר', original: 'המפק"ץ: שמרו על סדר ודיוק בתרגילים, זה עזר לקצב השיעור.' } ],
      improvement: [ { text: 'לאחוז בפירוט מטרות כל משימה', tag: 'מטרות', original: 'המפק"ץ: מומלץ לפרט את מטרות כל משימה כדי לשפר הבנה בקרב המשתתפים.' } ],
      overallSummary: 'המפק"צים ציינו סדר וטענו שיש להבהר מטרות המשימות.',
      originalOverall: 'טקסט מקורי מהמפק"ץ שמסביר את הסיכום וההמלצות בפירוט.'
    }
  },
  {
    id: 2,
    name: 'התנסות ב',
    preservationSummary: 'התוכן התקבל היטב על ידי המשתתפים.',
    improvementSummary: 'להפחית זמן תיאורטי ולהוסיף דוגמאות.',
    cadetFeedback: {
      preservation: [ { text: 'המשוב מהמשתתפים היה חיובי לגבי התוכן', tag: 'תוכן' }, { text: 'הצעירים אהבו את הפעילות המעשית', tag: 'מעשי' } ],
      improvement: [ { text: 'לקצר את ההרצאה התיאורטית', tag: 'קיצור' }, { text: 'להוסיף דוגמאות ויזואליות', tag: 'ויזואל' }, { text: 'רוצים יותר חומרים להדגמה', tag: 'חומרים' } ],
      generalSummary: 'צוערים נהנו אך רוצים חומרים נוספים.'
    },
    commanderFeedback: {
      preservation: [ { text: 'הקצב היה נכון, שמרו על דגש', tag: 'קצב', original: 'הטקסט המקורי מהמפק"ץ: הקצב היה נכון ושמרנו על דגש על התרגול המעשי.' } ],
      improvement: [ { text: 'צריך להבהיר קריטריונים להערכה', tag: 'קריטריונים', original: 'הטקסט המקורי מהמפק"ץ: יש להבהיר אילו קריטריונים משמשים להערכת ביצועים.' } ],
      overallSummary: 'המפק"צים סיכמו: הקפידו על קצב ובררו קריטריונים להערכה.',
      originalOverall: 'טקסט מקורי מלא מהמפק"ץ שמסכם את התצפיות וההמלצות.'
    }
  }
]

export default function Insightx() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')

  function openModal(content, title) {
    setModalContent(content)
    setModalTitle(title)
    setModalOpen(true)
  }

  return (
    <section dir="rtl" lang="he" style={{ minHeight: '100vh', padding: 24, boxSizing: 'border-box', background: '#fff' }}>
      <style>{`
        .insight-section-title{ text-align: right; margin: 12px 0; font-size: 18px; font-weight: 700; }
        .section-subtitle{ text-align: right; margin-bottom: 14px; color: #333; }
        .section-title-line{ border-bottom: 1px solid #eee; padding-bottom:6px; }
        .cadet-item{ background:#fff; padding:10px; border-radius:6px; margin-bottom:8px; text-align:right; }
        .commander-item{ background: linear-gradient(90deg,#fff,#fffefb); border:1px solid #eee; padding:10px; border-radius:6px; margin-bottom:8px; text-align:right; cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:8px; transition: box-shadow .12s, transform .08s; }
        .commander-item:hover{ transform: translateY(-4px); box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
        .tag-pill{ padding:4px 8px; border-radius:6px; white-space:nowrap; }
        .tag-preserve{ background:#eef2ff; color:#1f3b8a; }
        .tag-improve{ background:#fff6e6; color:#8a5a1f; }
        .experience-name{ text-align:right; font-size:20px; margin:0 0 6px 0; }
      `}</style>

      <h2 className="insight-section-title">פריסת התנסות</h2>
      <p className="section-subtitle">בחר/י התנסות כדי לראות נקודות שימור ושיפור וסיכום AI לכל חלק.</p>

      {experiences.map(exp => (
        <article key={exp.id} style={{ position: 'relative', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 20, background: '#fafafa' }}>
          <h3 className="experience-name">{exp.name}</h3>

          {/* top-level preservation/improvement moved under cadetFeedback per request */}

          {/* משוב צוערים */}
          {exp.cadetFeedback && (
            <section style={{ marginTop: 12 }}>
              <div className="section-title-line">
                <h4 className="section-subtitle">משוב צוערים</h4>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <h5 style={{ textAlign: 'right', marginBottom: 6 }}>שימור</h5>
                  {exp.cadetFeedback.preservation.map((p, i) => (
                    <div key={i} className="cadet-item">{p.text} <span style={{ marginRight: 8 }} className="tag-pill tag-preserve">{p.tag}</span></div>
                  ))}
                </div>

                <div style={{ flex: 1, minWidth: 260 }}>
                  <h5 style={{ textAlign: 'right', marginBottom: 6 }}>שיפור</h5>
                  {exp.cadetFeedback.improvement.map((p, i) => (
                    <div key={i} className="cadet-item">{p.text} <span style={{ marginRight: 8 }} className="tag-pill tag-improve">{p.tag}</span></div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 8, background: '#f7fbff', padding: 10, borderRadius: 6, textAlign: 'right' }}>
                <strong>סיכום צוערים:</strong>
                <div>{exp.cadetFeedback.generalSummary}</div>
              </div>
            </section>
          )}

          {/* משוב מפק"צים */}
          {exp.commanderFeedback && (
            <section style={{ marginTop: 12 }}>
              <div className="section-title-line">
                <h4 className="section-subtitle">משוב מפק"צים</h4>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <h5 style={{ textAlign: 'right', marginBottom: 6 }}>שימור</h5>
                  {exp.commanderFeedback.preservation.map((p, i) => (
                    <div key={i} className="commander-item" onClick={() => openModal(p.original, `מקור שימור — ${p.tag}`)}>
                      <div style={{ flex: 1, textAlign: 'right' }}>{p.text}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
                        <span className="tag-pill tag-preserve">{p.tag}</span>
                        <span style={{ fontSize: 14, opacity: 0.85 }}>🔍</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ flex: 1, minWidth: 260 }}>
                  <h5 style={{ textAlign: 'right', marginBottom: 6 }}>שיפור</h5>
                  {exp.commanderFeedback.improvement.map((p, i) => (
                    <div key={i} className="commander-item" onClick={() => openModal(p.original, `מקור שיפור — ${p.tag}`)}>
                      <div style={{ flex: 1, textAlign: 'right' }}>{p.text}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
                        <span className="tag-pill tag-improve">{p.tag}</span>
                        <span style={{ fontSize: 14, opacity: 0.85 }}>🔍</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div onClick={() => openModal(exp.commanderFeedback.originalOverall, 'מקור סיכום מפק"צים')} style={{ marginTop: 8, cursor: 'pointer' }}>
                <div className="commander-item" style={{ background: 'linear-gradient(90deg,#fffefb,#fff8f8)', border: '1px solid #eee' }}>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <strong>סיכום מפק"צים:</strong>
                    <div style={{ marginTop: 6 }}>{exp.commanderFeedback.overallSummary}</div>
                  </div>
                  <div style={{ marginLeft: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, opacity: 0.85 }}>🔍</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>
      ))}

      <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: 20 }}>
        <Link to="/">
          <button style={{ padding: '8px 14px', fontSize: 14 }}>חזור</button>
        </Link>
      </div>

      {/* Modal for commander originals */}
      {modalOpen && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }} onClick={() => setModalOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: '90%', maxWidth: 720, background: '#fff', borderRadius: 8, padding: 20, direction: 'rtl', boxSizing: 'border-box' }}>
            <h3 style={{ marginTop: 0, textAlign: 'right' }}>{modalTitle}</h3>
            <div style={{ whiteSpace: 'pre-wrap', textAlign: 'right' }}>{modalContent}</div>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <button onClick={() => setModalOpen(false)} style={{ padding: '8px 12px' }}>סגור</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
