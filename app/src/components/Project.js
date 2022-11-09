import { Button, TextField } from "@mui/material"
import { Stack, Box } from "@mui/system"
import HWSet from "./HWSet"
import { useState } from "react"

function Project({hwsets, project, setUpdateProjects, updateProjects}) {
    const user = localStorage.getItem('user')
    const [joined, setJoined] = useState(project.Users.includes(user) ? true : false)
    const [textValue, setTextValue] = useState('')
    const projectid = project.ProjectID
    const name = project.ProjectName
    const url = process.env.REACT_APP_BASE_URL

    const joinProjectHandler = () => {
        fetch(`${url}join/${projectid}/${user}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.response === `Joined ${projectid}`) {
                    setJoined(true)
                }
            alert(data.response)
            })
    }

    const leaveProjectHandler = () => {
        fetch(`${url}leave/${projectid}/${user}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.response === `Left ${projectid}`) {
                    setJoined(false)
                }
            alert(data.response)
            })
    }

    const addUserHandler = () => {
        if (textValue === '') {
            alert('Please enter valid User ID')
        }else {
            fetch(`${url}addusers/${textValue}/${projectid}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.response === 'user does not exist' || data.response === 'user already authorized'){
                        alert(data.response)
                    }else{
                        alert(data.response)
                        setUpdateProjects(!updateProjects)
                    }
                })
                setTextValue('')
        }
    }

    const renderedHWSets = hwsets.map((hwset) => {
        return (
            <HWSet 
                key={hwset.Name} 
                hwset={hwset} 
                project={project} 
                joined={joined} 
                setUpdateProjects={setUpdateProjects} 
                updateProjects={updateProjects} />
        )
    })

    const renderedUsers = project['Authorized Users'].map((user) => {
        return user + ' '
    })

    return (
        <Stack direction='row' spacing={2} sx={{ border: 1, borderColor: 'lightblue', p: 2, borderRadius: 2, justifyContent: 'space-evenly'}}>
            <Box sx={{ fontWeight: 500, width: 100 }}>{name}</Box>
            <Stack justifyContent={'space-between'}>
                <Box sx={{ fontWeight: 300, width: 200 }}>{renderedUsers}</Box>
                <Stack spacing={2} sx={{ width: 200 }}>
                    <TextField value={textValue} fullWidth id="outlined-basic" label="Enter a valid User ID" 
                    variant="outlined" onChange={(e) => {
                        setTextValue(e.target.value)}
                    } />
                    <Button variant="outlined" onClick={addUserHandler} fullWidth sx={{ ':hover': {bgcolor: 'primary.main', color: 'white'}}}>Add User</Button>
                </Stack>
            </Stack>
            <Stack spacing={2}>
                {renderedHWSets}
            </Stack>
            <Stack sx={{justifyContent: 'space-around'}}>
                {!joined ? 
                    <Button variant='contained' onClick={joinProjectHandler}  sx={{ border: 1, borderColor: 'primary.main', height: 65, ':hover': {color: 'primary.main', bgcolor: 'white'} }}>Join Project</Button> 
                    : 
                    <Button variant='contained' onClick={leaveProjectHandler}  sx={{ border: 1, borderColor: 'primary.main', height: 65, ':hover': {color: 'primary.main', bgcolor: 'white'} }}>Leave Project</Button>
                }
            </Stack>
        </Stack>
    )
  }
  
  export default Project
  