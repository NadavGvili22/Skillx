import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const LESSONS = [
  { id: 'exp-logistics-officer', name: 'קצין לוגיסטיקה' },
  { id: 'exp-education-officer', name: 'קצין חינוך' },
  { id: 'exp-guidance-officer', name: 'קצין הדרכה' },
  { id: 'exp-training-officer', name: 'קצין אימונים' },
  { id: 'exp-commitment-lesson', name: 'שיעור מחוייבות' },
  { id: 'exp-statehood-lesson', name: 'שיעור ממלכתיות' },
  { id: 'exp-debrief-lesson', name: 'שיעור תחקיר' },
  { id: 'exp-identity-lesson', name: 'שיעור זהות' },
  { id: 'exp-company-deputy', name: 'סמ"פ' },
  { id: 'exp-weekly-commander', name: 'מפקד מתנסה שבועי' },
]

const GROUPS = [
  { id: 'group-a', name: 'פלוגה א' },
  { id: 'group-b', name: 'פלוגה ב' },
  { id: 'group-c', name: 'פלוגה ג' },
]

const SEED_REPORTS = [
  {
    id: 'rep-1',
    lessonId: 'exp-logistics-officer',
    groupId: 'group-a',
    author: 'נועה לוי',
    text: 'יש לחזק את היכרות הנהלים עם מחסן הציוד.',
    createdAt: '2024-04-02T09:15:00.000Z',
  },
  {
    id: 'rep-2',
    lessonId: 'exp-commitment-lesson',
    groupId: 'group-b',
    author: 'אלי כהן',
    text: 'חסרה דוגמה אישית בדיון, להוסיף תרגיל מסכם.',
    createdAt: '2024-04-03T12:30:00.000Z',
  },
  {
    id: 'rep-3',
    lessonId: 'exp-identity-lesson',
    groupId: 'group-a',
    author: 'מאיה בר',
    text: 'הצגת התוכן הייתה חזקה, להוסיף סבב שיח מסכם.',
    createdAt: '2024-04-04T15:10:00.000Z',
  },
]

const styles = {
  page: {
    minHeight: '100vh',
    padding: 24,
    boxSizing: 'border-box',
    background: 'linear-gradient(120deg, #f8f4e8 0%, #f1f6ff 100%)',
    color: '#1f2937',
    direction: 'rtl',
    textAlign: 'right',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
  },
  subTitle: {
    margin: '6px 0 0',
    fontSize: 14,
    color: '#4b5563',
  },
  card: {
    background: '#ffffff',
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: '#475569',
    marginBottom: 6,
  },
  select: {
    padding: '8px 10px',
    borderRadius: 10,
    border: '1px solid #d1d5db',
    minWidth: 200,
    background: '#fff',
    textAlign: 'right',
  },
  input: {
    width: '100%',
    minHeight: 100,
    padding: 12,
    borderRadius: 10,
    border: '1px solid #d1d5db',
    resize: 'vertical',
    textAlign: 'right',
  },
  button: {
    padding: '10px 16px',
    borderRadius: 10,
    border: 'none',
    background: '#0f172a',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  buttonGhost: {
    padding: '10px 16px',
    borderRadius: 10,
    border: '1px solid #0f172a',
    background: 'transparent',
    color: '#0f172a',
    fontWeight: 600,
    cursor: 'pointer',
  },
  badge: {
    padding: '6px 10px',
    borderRadius: 999,
    background: '#e2e8f0',
    fontSize: 12,
    fontWeight: 600,
  },
  reportsList: {
    display: 'grid',
    gap: 12,
    marginTop: 12,
  },
  reportItem: {
    padding: 14,
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    background: '#f8fafc',
  },
  footer: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 20,
  },
}

const getDefaultUser = () => ({
  id: 'user-1',
  name: 'חניך לדוגמה',
  role: 'student',
  groupId: 'group-a',
})

const getCurrentUser = () => {
  if (typeof window === 'undefined') {
    return getDefaultUser()
  }
  const stored = window.localStorage.getItem('skillxUser')
  if (!stored) {
    return getDefaultUser()
  }
  try {
    return JSON.parse(stored)
  } catch (error) {
    return getDefaultUser()
  }
}

export default function Verifyx() {
  const currentUser = useMemo(() => getCurrentUser(), [])
  const role = currentUser.role || currentUser.type || 'student'
  const isTeacher = role === 'teacher' || role === 'admin'
  const studentGroupId = currentUser.groupId || GROUPS[0].id

  const [reports, setReports] = useState(SEED_REPORTS)
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [composeLessonId, setComposeLessonId] = useState(LESSONS[0].id)
  const [composeGroupId, setComposeGroupId] = useState(studentGroupId)
  const [composeText, setComposeText] = useState('')

  const [filterLessonId, setFilterLessonId] = useState(LESSONS[0].id)
  const [filterGroupId, setFilterGroupId] = useState(studentGroupId)
  const [isShowingReports, setIsShowingReports] = useState(false)

  const filteredReports = useMemo(() => {
    if (!isShowingReports) {
      return []
    }
    const targetGroupId = isTeacher ? filterGroupId : studentGroupId
    return reports.filter(
      (report) => report.lessonId === filterLessonId && report.groupId === targetGroupId
    )
  }, [filterGroupId, filterLessonId, isShowingReports, isTeacher, reports, studentGroupId])

  const handleAddReport = (event) => {
    event.preventDefault()
    const text = composeText.trim()
    if (!text) {
      return
    }
    const targetGroupId = isTeacher ? composeGroupId || filterGroupId : studentGroupId
    const newReport = {
      id: `rep-${Date.now()}`,
      lessonId: composeLessonId,
      groupId: targetGroupId,
      author: currentUser.name || 'לא ידוע',
      text,
      createdAt: new Date().toISOString(),
    }
    setReports((prev) => [newReport, ...prev])
    setComposeText('')
  }

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>מרחב דיווחים</h2>
          <p style={styles.subTitle}>
            שליחת בעיות וסיכומים לפי התנסות ופלוגה.
          </p>
        </div>
        <div style={styles.row}>
          <span style={styles.badge}>
            {isTeacher ? 'מפקד' : 'חניך'} {currentUser.name ? `· ${currentUser.name}` : ''}
          </span>
          <span style={styles.badge}>
            {isTeacher ? 'מנהל' : 'רגיל'} חשבון
          </span>
          <button
            type="button"
            style={styles.button}
            onClick={() => setIsComposerOpen((prev) => !prev)}
          >
            {isComposerOpen ? 'סגירת טופס דיווח' : 'הוספת דיווח'}
          </button>
        </div>
      </div>

      {isComposerOpen && (
        <div style={styles.card}>
          <h3 style={{ marginTop: 0 }}>דיווח חדש</h3>
          <form onSubmit={handleAddReport}>
            <div style={styles.row}>
              <div>
                <label style={styles.label} htmlFor="compose-lesson">
                  התנסות
                </label>
                <select
                  id="compose-lesson"
                  value={composeLessonId}
                  onChange={(event) => setComposeLessonId(event.target.value)}
                  style={styles.select}
                >
                  {LESSONS.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.name}
                    </option>
                  ))}
                </select>
              </div>
              {isTeacher ? (
                <div>
                  <label style={styles.label} htmlFor="compose-group">
                    פלוגה
                  </label>
                  <select
                    id="compose-group"
                    value={composeGroupId}
                    onChange={(event) => setComposeGroupId(event.target.value)}
                    style={styles.select}
                  >
                    {GROUPS.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label style={styles.label}>פלוגה</label>
                  <div style={styles.badge}>
                    {GROUPS.find((group) => group.id === studentGroupId)?.name || studentGroupId}
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={styles.label} htmlFor="compose-text">
                טקסט דיווח
              </label>
              <textarea
                id="compose-text"
                value={composeText}
                onChange={(event) => setComposeText(event.target.value)}
                placeholder="כתבו את הבעיה או הסיכום..."
                style={styles.input}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <button type="submit" style={styles.button}>
                שליחת דיווח
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.card}>
        <h3 style={{ marginTop: 0 }}>איתור דיווחים</h3>
        <div style={styles.row}>
          <div>
            <label style={styles.label} htmlFor="filter-lesson">
              התנסות
            </label>
            <select
              id="filter-lesson"
              value={filterLessonId}
              onChange={(event) => setFilterLessonId(event.target.value)}
              style={styles.select}
            >
              {LESSONS.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </option>
              ))}
            </select>
          </div>
          {isTeacher ? (
            <div>
              <label style={styles.label} htmlFor="filter-group">
                פלוגה
              </label>
              <select
                id="filter-group"
                value={filterGroupId}
                onChange={(event) => setFilterGroupId(event.target.value)}
                style={styles.select}
              >
                {GROUPS.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label style={styles.label}>פלוגה</label>
              <div style={styles.badge}>
                {GROUPS.find((group) => group.id === studentGroupId)?.name || studentGroupId}
              </div>
            </div>
          )}
          <button
            type="button"
            style={styles.buttonGhost}
            onClick={() => setIsShowingReports(true)}
          >
            הצגת דיווחים
          </button>
        </div>

        {isShowingReports ? (
          <div style={styles.reportsList}>
            {filteredReports.length === 0 ? (
              <div style={styles.reportItem}>אין דיווחים לבחירה הזו עדיין.</div>
            ) : (
              filteredReports.map((report) => {
                const lesson = LESSONS.find((item) => item.id === report.lessonId)
                const group = GROUPS.find((item) => item.id === report.groupId)
                return (
                  <div key={report.id} style={styles.reportItem}>
                    <div style={{ fontWeight: 600 }}>
                      {lesson?.name || report.lessonId} · {group?.name || report.groupId}
                    </div>
                    <div style={{ marginTop: 6 }}>{report.text}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
                      {report.author} · {new Date(report.createdAt).toLocaleString('he-IL')}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        ) : (
          <p style={{ marginTop: 12, color: '#64748b' }}>
            בחרו התנסות ופלוגה ואז לחצו על "הצגת דיווחים".
          </p>
        )}
      </div>

      <div style={styles.footer}>
        <Link to="/">
          <button style={{ padding: '8px 14px', fontSize: 14 }}>חזרה</button>
        </Link>
      </div>
    </section>
  )
}
