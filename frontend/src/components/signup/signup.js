// SignUp.js

import React, { useState } from 'react'
import { signup } from '../../services/apiServices'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signup(formData)
      console.log('SignUp successful:', response)
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp
