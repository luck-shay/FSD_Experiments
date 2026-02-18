import { createContext, useState } from 'react'

export const FormContext = createContext()

export function FormProvider({ children }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <FormContext.Provider value={{ name, setName, email, setEmail, submitted, setSubmitted, handleSubmit }}>
      {children}
    </FormContext.Provider>
  )
}
