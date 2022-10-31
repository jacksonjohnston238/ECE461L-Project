import './App.css'
import Projects from './components/Projects'
import LoginPage from './components/LoginPage'
import { useState } from 'react'
import { Box } from '@mui/system'
import Header from './components/Header'
import ProjectMenu from './components/ProjectMenu'

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || '')


  return (
    // <Box className="App">
    //   <Header user={user} setUser={setUser}></Header>
    //   {user === '' ? 
    //     <LoginPage setUser={setUser}></LoginPage>
    //     :
          
    //       <Projects></Projects>
    //   }
    // </Box>
    <ProjectMenu></ProjectMenu>
  )
}

export default App
