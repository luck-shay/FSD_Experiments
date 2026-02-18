import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset } from './store'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="card">
      <h1>State Management Using Redux</h1>
      <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px' }}>
        {count}
      </div>
      <button onClick={() => dispatch(increment())} style={{ marginRight: '10px' }}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <button onClick={() => dispatch(reset())} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  )
}

export default App
