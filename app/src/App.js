import './App.css'
import Projects from './components/Projects'
import LoginPage from './components/LoginPage'
import { useState } from 'react'
import { Box } from '@mui/system'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || '')


  return (
    <Box className="App">
      <Header user={user} setUser={setUser}></Header>
      {user === '' ? 
        <LoginPage setUser={setUser}></LoginPage>
        :
          
          <Projects user={user}></Projects>
      }
    </Box>
  )
}

export default App
