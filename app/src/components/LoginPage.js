import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function LoginPage({setUser}) {
    const [loginOrSignup, setLoginOrSignup] = useState('Login')

    return (
      <Box sx={{ p: 10}}>
        {loginOrSignup === 'Login' ? 
            <Login toggleLoginOrSignup={setLoginOrSignup} setUser={setUser}></Login>
            :
            <Signup toggleLoginOrSignup={setLoginOrSignup} setUser={setUser}></Signup>
        }
      </Box>
    )
  }
  
  export default LoginPage
  