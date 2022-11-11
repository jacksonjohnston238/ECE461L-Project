import { Stack, Box, TextField, Button, Link } from "@mui/material"
import { useState } from "react"

function Signup({toggleLoginOrSignup, setUser}){

    const [username, setUsername] = useState('')
    const [userid, setUserID] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const url = process.env.REACT_APP_BASE_URL

    const handleSignup = () => {
        if (username === '') {
            alert('Please enter valid Username')
        } else if (userid === '') {
            alert('Please enter valid User ID')
        } else if (password === '') {
            alert('Please enter valid Password')
        } else if (confirmPassword === '') {
            alert('Please confirm Password')
        }
        else {
            fetch(`${url}signup/${username}/${userid}/${password}/${confirmPassword}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.response === 'new user created') {
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
            <Box sx={{border: 4, borderRadius: 2, borderColor: 'primary.main', p:10, pt:1}}>
            <Stack spacing={2}>
                <h1>Sign Up</h1>
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
                <h2>Confirm Password</h2>
                <TextField value={confirmPassword === 0 ? '' : confirmPassword} type="string" id="outlined-basic" label="Re-Enter Password" variant="outlined" onChange={(e) =>{
                    setConfirmPassword(e.target.value)
                }}/>
                
                <Button variant='contained' size= 'large'
                    onClick={handleSignup}>
                    Sign Up
                </Button>
                </Stack>
                <p>Already have an account? <Link onClick={() => toggleLoginOrSignup('Login')} sx={{cursor: 'pointer'}}>Log In</Link></p>
            </Box>
        </Box>
    )
}

export default Signup