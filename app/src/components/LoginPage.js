import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function LoginPage({setUser}) {
    const [loginOrSignup, setLoginOrSignup] = useState('Login')

    // useEffect(() => {
    //     console.log(loginOrSignup)
    // }, [loginOrSignup])

    return (
      <Box>
        {loginOrSignup === 'Login' ? 
            <Login toggleLoginOrSignup={setLoginOrSignup} setUser={setUser}></Login>
            :
            <Signup toggleLoginOrSignup={setLoginOrSignup} setUser={setUser}></Signup>
        }
      </Box>
    )
  }
  
  export default LoginPage
  