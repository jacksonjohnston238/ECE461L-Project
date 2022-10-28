import './App.css'
import Projects from './components/Projects'
import LoginPage from './components/LoginPage'
import { useState } from 'react'
import { Box } from '@mui/system'

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || '')


  return (
    <Box className="App">
      {user === '' ? 
        <LoginPage setUser={setUser}></LoginPage>
        :
        <Projects></Projects>
      }
    </Box>
  )
}

export default App
