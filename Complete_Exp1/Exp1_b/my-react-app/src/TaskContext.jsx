import { createContext, useState } from 'react'

export const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (!task.trim()) return
    setTasks([...tasks, task])
    setTask('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <TaskContext.Provider value={{ task, setTask, tasks, setTasks, addTask, handleKeyDown }}>
      {children}
    </TaskContext.Provider>
  )
}
