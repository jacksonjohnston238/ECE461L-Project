import { Stack, Box, TextField, Button, Link } from "@mui/material"
import { useState } from "react"

function Login({toggleLoginOrSignup, setUser}){

    const [userid, setUserID] = useState('')
    const [password, setPassword] = useState('')
    const url = 'http://localhost:5000/' // use for local development
    // const url = '/' // use for heroku deployment

    const handleLogin = () => {
        if (userid === '') {
            alert('Please enter valid User ID')
        } else if (password === '') {
            alert('Please enter valid Password')
        } else {
            fetch(`${url}login/${userid}/${password}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.response === 'successfully logged in') {
                    setUser(data.userID)
                    localStorage.setItem('user', data.userID)
                }
                alert(data.response)
            })
        }
    }

    return (
        
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pt: 3,
        pb: 3
      }}
    >
            <Box sx={{border: 4, borderColor: 'blueviolet', p:5, pt:1}}>
            <Stack spacing={2}>
                <h1>Login</h1>
                <h2>User ID</h2>
                <TextField value={userid === 0 ? '' : userid} type="string" id="outlined-basic" label="Enter User ID" variant="outlined" onChange={(e) =>{
                    setUserID(e.target.value)
                }}/>
                <h2>Password</h2>
                <TextField value={password === 0 ? '' : password} type="string" id="outlined-basic" label="Enter Password" variant="outlined" onChange={(e) =>{
                    setPassword(e.target.value)
                }}/>
                
                <Button variant='contained' size= 'large'
                    onClick={handleLogin}>
                    Login
                </Button>
                </Stack>
                <p>Don't have an account? <Link  onClick={() => {toggleLoginOrSignup('Signup')}} sx={{cursor: 'pointer'}}>Sign Up</Link></p>
            </Box>
        </Box>
    )
}

export default Login