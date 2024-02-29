// src/services/taskService.js

import axios from 'axios'

const baseUrl = process.env.BASE_URL

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/task`, taskData)
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export const getTasks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/task`)
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export const markTaskAsCompleted = async (taskId) => {
  try {
    const response = await axios.put(`${baseUrl}/api/task/${taskId}/complete`)
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export const editTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${baseUrl}/api/task/${taskId}`, taskData)
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/tasks/${taskId}`)
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export const signup = async (userData) => {
  try {
    const response = await axios.post(
      `http://localhost:9000/api/user/signup`,
      userData,
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export const login = async (userData) => {
  try {
    const response = await axios.post(
      `http://localhost:9000/api/user/login`,
      userData,
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
