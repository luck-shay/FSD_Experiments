import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|org|net|edu|gov|uk|us|ca|au|de|fr|jp|cn|br|ru)$/i
    return emailRegex.test(email)
  }

  // Password validation
  const validatePassword = (password) => {
    const errors = []
    
    // Should start with a capital letter
    if (!/^[A-Z]/.test(password)) {
      errors.push('Must start with a capital letter')
    }
    
    // Should have at least one number
    if (!/\d/.test(password)) {
      errors.push('Must contain at least one number')
    }
    
    // Should have at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) {
      errors.push('Must contain at least one special character')
    }
    
    // Should have at least 5 characters
    if (password.length < 5) {
      errors.push('Must be at least 5 characters long')
    }
    
    return errors
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    
    if (touched.email) {
      if (!value) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }))
      } else if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Email must contain @ and a valid domain (.com, .in, etc.)' }))
      } else {
        setErrors(prev => ({ ...prev, email: '' }))
      }
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    
    if (touched.password) {
      if (!value) {
        setErrors(prev => ({ ...prev, password: ['Password is required'] }))
      } else {
        const passwordErrors = validatePassword(value)
        setErrors(prev => ({ ...prev, password: passwordErrors }))
      }
    }
  }

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }))
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }))
    } else if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Email must contain @ and a valid domain (.com, .in, etc.)' }))
    } else {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }))
    if (!password) {
      setErrors(prev => ({ ...prev, password: ['Password is required'] }))
    } else {
      const passwordErrors = validatePassword(password)
      setErrors(prev => ({ ...prev, password: passwordErrors }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({ email: true, password: true })
    
    // Validate all fields
    const emailError = !email ? 'Email is required' : !validateEmail(email) ? 'Email must contain @ and a valid domain (.com, .in, etc.)' : ''
    const passwordErrors = !password ? ['Password is required'] : validatePassword(password)
    
    setErrors({
      email: emailError,
      password: passwordErrors
    })
    
    // Check if form is valid
    if (!emailError && passwordErrors.length === 0) {
      setSubmitted(true)
      alert('Form submitted successfully!\n\nEmail: ' + email + '\nPassword: ' + password)
      // You can handle form submission here
    }
  }

  const isFormValid = () => {
    return email && password && validateEmail(email) && validatePassword(password).length === 0
  }

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Client-Side Form Validation</h1>
        <p className="subtitle">Experiment-2: Email & Password Validation</p>
        
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={touched.email && errors.email ? 'error' : touched.email && !errors.email ? 'valid' : ''}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
            {touched.email && !errors.email && email && (
              <div className="success-message">✓ Valid email</div>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={touched.password && errors.password?.length > 0 ? 'error' : touched.password && errors.password?.length === 0 ? 'valid' : ''}
              placeholder="Enter your password"
            />
            {touched.password && errors.password && errors.password.length > 0 && (
              <div className="error-list">
                {errors.password.map((error, index) => (
                  <div key={index} className="error-message">✗ {error}</div>
                ))}
              </div>
            )}
            {touched.password && errors.password?.length === 0 && password && (
              <div className="success-message">✓ Valid password</div>
            )}
            <div className="password-rules">
              <small>Password requirements:</small>
              <ul>
                <li className={password && /^[A-Z]/.test(password) ? 'valid-rule' : ''}>
                  Start with a capital letter
                </li>
                <li className={password && /\d/.test(password) ? 'valid-rule' : ''}>
                  At least one number
                </li>
                <li className={password && /[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password) ? 'valid-rule' : ''}>
                  At least one special character
                </li>
                <li className={password && password.length >= 5 ? 'valid-rule' : ''}>
                  At least 5 characters
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
