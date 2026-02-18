import { useContext } from 'react'
import { CountContext } from './CountContext'
import './App.css'

function App() {
  const { count, setCount } = useContext(CountContext)

  return (
    <div className="card">
      <h1>Global State Management Using Context API</h1>
      <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px' }}>
        {count}
      </div>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '10px' }}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  )
}

export default App
