import { Button } from "@mui/material"
import { Stack, Box } from "@mui/system"
import HWSet from "./HWSet"
import { useState } from "react"

function Project({name, hwsets, users, projectid}) {
    const [joined, setJoined] = useState(false)
    // const url = 'http://localhost:5000/' // use for local development
    const url = '/' // use for heroku deployment

    const joinProjectHandler = () => {
        setJoined(true)
        fetch(`${url}join/${projectid}`)
            .then((response) => response.json())
            .then((data) => alert(data.response))
    }

    const leaveProjectHandler = () => {
        setJoined(false)
        fetch(`${url}leave/${projectid}`)
            .then((response) => response.json())
            .then((data) => alert(data.response))
    }

    return (
        <Stack direction='row' spacing={2} sx={{ border: 1, borderColor: 'lightblue', p: 2}}>
            <Box sx={{ fontWeight: 500, width: 100 }}>{name}</Box>
            <Box sx={{ fontWeight: 300, width: 200 }}>{users}</Box>
            <Stack spacing={2}>
                <HWSet name={hwsets[0]} availability={50} capacity={100} projectid={projectid} />
                <HWSet name={hwsets[1]} availability={10} capacity={100} projectid={projectid} />
            </Stack>
            {!joined ? 
                <Button variant='contained' onClick={joinProjectHandler}>Join Project</Button> 
                : 
                <Button variant='contained' onClick={leaveProjectHandler}>Leave Project</Button>
            }
        </Stack>
    )
  }
  
  export default Project
  