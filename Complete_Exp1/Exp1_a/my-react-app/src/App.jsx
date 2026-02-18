import { useContext } from 'react'
import { CountContext } from './CountContext'
import './App.css'

function App(){
  const { count, setCount } = useContext(CountContext)

  return(
    <div className="outer-box">
      <div className="inner-box">{count}</div>
      <div className="inner-box clickable" onClick={()=>setCount(count+1)}>+</div>
      <div className="inner-box clickable" onClick={()=>setCount(count-1)}>-</div>
    </div>
  )
}

export default App
