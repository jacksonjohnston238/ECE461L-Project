import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'

function Header({user, setUser}) {
    
    const handleLogout = () => {
        alert('logged out')
        setUser('')
        localStorage.setItem('user', '')
        localStorage.setItem('project-selction', null)
    }
  
    return (
        <AppBar>
            <Toolbar sx={{ justifyContent: 'space-between'}}>
                <Typography variant='h6'>Software Squad</Typography>
                {user != '' ? <Link onClick={handleLogout} sx={{ cursor: 'pointer', color: 'white', ml: 20}}>logout</Link> : <Box></Box>}
            </Toolbar>
        </AppBar>
    )
  }
  
  export default Header