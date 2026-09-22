import { useState } from 'react'
import './App.css'

async function ask(q: string): Promise<string> {
  const res = await fetch(`/chat?q=${encodeURIComponent(q)}`)
  if (!res.ok) {
    throw new Error(`请求失败：${res.status} ${res.statusText}`)
  }
  return await res.text()
}

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    try {
      const text = await ask(question)
      setAnswer(text)
    } catch (err) {
      setAnswer(`出错啦：${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <h1>小财 · 企业财务数字员工</h1>
      <div className="chat-box">
        <div className="answer-area">
          {answer ? <p>{answer}</p> : <p className="placeholder">回答会显示在这里…</p>}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="请输入你的问题"
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? '发送中…' : '发送'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
