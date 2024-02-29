import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const LoginPage = lazy(() => import('./pages/loginpage'))
const SignupPage = lazy(() => import('./pages/signuppage'))
const DashboardPage = lazy(() => import('./pages/dashboard'))
const YourContextProvider = lazy(() => import('./yourContextProvider'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <YourContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </YourContextProvider>
      </Suspense>
    </Router>
  )
}

export default App
