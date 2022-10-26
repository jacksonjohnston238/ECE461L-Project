import { Stack, Box, TextField, Button } from "@mui/material"
import { useState } from "react"

function Login(){

    const [username, setUsername] = useState('')
    const [userid, setUserID] = useState('')
    const [password, setPassword] = useState('')

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
                <h2>Username</h2>
                <TextField value={username === 0 ? '' : username} type="string" id="outlined-basic" label="Enter Username" variant="outlined" onChange={(e) =>{
                    setUsername(e.target.value)
                }}/>
                <h2>User ID</h2>
                <TextField value={userid === 0 ? '' : userid} type="string" id="outlined-basic" label="Enter User ID" variant="outlined" onChange={(e) =>{
                    setUserID(e.target.value)
                }}/>
                <h2>Password</h2>
                <TextField value={password === 0 ? '' : password} type="string" id="outlined-basic" label="Enter Password" variant="outlined" onChange={(e) =>{
                    setPassword(e.target.value)
                }}/>
                
                <Button variant='contained' size= 'large'
                    onClick={() => 
                    /*ToDo: fill in rerouting and verification */alert("click")}>
                    Login
                </Button>
                </Stack>
                <p>Don't have an account? <a href='link'>Sign Up</a></p>
            </Box>
        </Box>
    )
}

export default Login