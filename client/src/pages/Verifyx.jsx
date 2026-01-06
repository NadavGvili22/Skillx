import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const LESSONS = [
  { id: 'lesson-math', name: 'Math' },
  { id: 'lesson-physics', name: 'Physics' },
  { id: 'lesson-history', name: 'History' },
  { id: 'lesson-english', name: 'English' },
]

const GROUPS = [
  { id: 'group-a', name: 'Group A' },
  { id: 'group-b', name: 'Group B' },
  { id: 'group-c', name: 'Group C' },
]

const SEED_REPORTS = [
  {
    id: 'rep-1',
    lessonId: 'lesson-math',
    groupId: 'group-a',
    author: 'Noa Levi',
    text: 'Struggled with fractions. Need extra practice set.',
    createdAt: '2024-04-02T09:15:00.000Z',
  },
  {
    id: 'rep-2',
    lessonId: 'lesson-physics',
    groupId: 'group-b',
    author: 'Eli Cohen',
    text: 'Lab report incomplete, missed the measurements table.',
    createdAt: '2024-04-03T12:30:00.000Z',
  },
  {
    id: 'rep-3',
    lessonId: 'lesson-history',
    groupId: 'group-a',
    author: 'Maya Bar',
    text: 'Great presentation on the timeline activity.',
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
  },
  input: {
    width: '100%',
    minHeight: 100,
    padding: 12,
    borderRadius: 10,
    border: '1px solid #d1d5db',
    resize: 'vertical',
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
  name: 'Student Demo',
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
      author: currentUser.name || 'Unknown',
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
          <h2 style={styles.title}>Reports Workspace</h2>
          <p style={styles.subTitle}>
            Submit problems and review reports by lesson and group.
          </p>
        </div>
        <div style={styles.row}>
          <span style={styles.badge}>
            {isTeacher ? 'Teacher' : 'Student'} {currentUser.name ? `· ${currentUser.name}` : ''}
          </span>
          <span style={styles.badge}>
            {isTeacher ? 'Admin' : 'Standard'} account
          </span>
          <button
            type="button"
            style={styles.button}
            onClick={() => setIsComposerOpen((prev) => !prev)}
          >
            {isComposerOpen ? 'Close report form' : 'Add report'}
          </button>
        </div>
      </div>

      {isComposerOpen && (
        <div style={styles.card}>
          <h3 style={{ marginTop: 0 }}>New report</h3>
          <form onSubmit={handleAddReport}>
            <div style={styles.row}>
              <div>
                <label style={styles.label} htmlFor="compose-lesson">
                  Lesson
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
                    Group
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
                  <label style={styles.label}>Group</label>
                  <div style={styles.badge}>
                    {GROUPS.find((group) => group.id === studentGroupId)?.name || studentGroupId}
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={styles.label} htmlFor="compose-text">
                Report text
              </label>
              <textarea
                id="compose-text"
                value={composeText}
                onChange={(event) => setComposeText(event.target.value)}
                placeholder=" Write the problem or progress note..."
                style={styles.input}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <button type="submit" style={styles.button}>
                Submit report
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.card}>
        <h3 style={{ marginTop: 0 }}>Find reports</h3>
        <div style={styles.row}>
          <div>
            <label style={styles.label} htmlFor="filter-lesson">
              Lesson
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
                Group
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
              <label style={styles.label}>Group</label>
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
            Show reports
          </button>
        </div>

        {isShowingReports ? (
          <div style={styles.reportsList}>
            {filteredReports.length === 0 ? (
              <div style={styles.reportItem}>No reports for this selection yet.</div>
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
                      {report.author} · {new Date(report.createdAt).toLocaleString()}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        ) : (
          <p style={{ marginTop: 12, color: '#64748b' }}>
            Choose lesson and group, then press "Show reports".
          </p>
        )}
      </div>

      <div style={styles.footer}>
        <Link to="/">
          <button style={{ padding: '8px 14px', fontSize: 14 }}>Return</button>
        </Link>
      </div>
    </section>
  )
}
