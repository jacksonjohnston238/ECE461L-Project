import { Button } from "@mui/material"
import { Stack, Box } from "@mui/system"
import HWSet from "./HWSet"
import { useState } from "react"

function Project({name, hwsets, users, projectid, userInProject}) {
    const [joined, setJoined] = useState(userInProject)
    const url = process.env.REACT_APP_BASE_URL

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

    const renderedHWSets = hwsets.map((hwset) => {
        return (
            <HWSet key={hwset.Name} name={hwset.Name} availability={hwset.Availability} capacity={hwset.Capacity} projectid={projectid} projectName={name} joined={joined}/>
        )
    })

    const renderedUsers = users.map((user) => {
        return user + ' '
    })

    return (
        <Stack direction='row' spacing={2} sx={{ border: 1, borderColor: 'lightblue', p: 2}}>
            <Box sx={{ fontWeight: 500, width: 100 }}>{name}</Box>
            <Box sx={{ fontWeight: 300, width: 200 }}>{renderedUsers}</Box>
            <Stack spacing={2}>
                {renderedHWSets}
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
  