import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function LoginPage() {
    const [loginOrSignup, setLoginOrSignup] = useState('Login')

    // useEffect(() => {
    //     console.log(loginOrSignup)
    // }, [loginOrSignup])

    return (
      <Box>
        {loginOrSignup === 'Login' ? 
            <Login toggleLoginOrSignup={setLoginOrSignup}></Login>
            :
            <Signup toggleLoginOrSignup={setLoginOrSignup}></Signup>
        }
      </Box>
    )
  }
  
  export default LoginPage
  