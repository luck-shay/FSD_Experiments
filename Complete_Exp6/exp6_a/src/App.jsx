import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    skills: [],
    address: '',
    state: ''
  });

  const skillOptions = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'CSS'];
  const states = ['', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      skills: checked 
        ? [...prevState.skills, value]
        : prevState.skills.filter(skill => skill !== value)
    }));
  };

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = calculateAge(formData.dob);
    
    const message = `Form Submitted Successfully!\n\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nGender: ${formData.gender}\nDate of Birth: ${formData.dob}\nAge: ${age} years\nSkills: ${formData.skills.join(', ') || 'None'}\nAddress: ${formData.address}\nState: ${formData.state}`;
    
    alert(message);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      skills: [],
      address: '',
      state: ''
    });
  };

  return (
    <div className="app-container">
      <div className="form-wrapper">
        <h1 className="form-title">Registration Form</h1>
        <p className="form-subtitle">Fill out the form below</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          {/* Name Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleInputChange}
                  required
                />
                <span>Male</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleInputChange}
                  required
                />
                <span>Female</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleInputChange}
                  required
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth *</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
            {formData.dob && (
              <p className="age-display">Age: {calculateAge(formData.dob)} years</p>
            )}
          </div>

          {/* Skills */}
          <div className="form-group">
            <label>Skills</label>
            <div className="checkbox-group">
              {skillOptions.map(skill => (
                <label key={skill} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your full address"
              rows="4"
              required
            />
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state === '' ? 'Select a state' : state}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
            <button type="button" onClick={handleReset} className="btn btn-reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
