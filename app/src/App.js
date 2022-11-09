import './App.css'
import Projects from './components/Projects'
import LoginPage from './components/LoginPage'
import { useState } from 'react'
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || '')

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#7289da',
      },
    },
    typography: {
      fontFamily: [
        'Segoe UI','sans-serif'
      ].join(',')
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Header user={user} setUser={setUser}></Header>
          {user === '' ? 
            <LoginPage setUser={setUser}></LoginPage>
            :
              <Projects></Projects>
          }
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
