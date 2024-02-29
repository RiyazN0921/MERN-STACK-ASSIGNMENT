import { createContext, useContext, useState } from 'react'

const YourContext = createContext()

const YourContextProvider = ({ children }) => {
  const [initialValue, setInitialValue] = useState(null)

  return (
    <YourContext.Provider value={{ initialValue, setInitialValue }}>
      {children}
    </YourContext.Provider>
  )
}

export default YourContextProvider
