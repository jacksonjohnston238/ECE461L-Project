import { Button } from "@mui/material"
import { Stack, Box } from "@mui/system"
import HWSet from "./HWSet"
import { useState } from "react"

function Project({hwsets, project}) {
    const user = localStorage.getItem('user')
    const [joined, setJoined] = useState(project.Users.includes(user) ? true : false)
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

    const renderedHWSets = hwsets.map((hwset) => {
        return (
            <HWSet key={hwset.Name} hwset={hwset} project={project} joined={joined}/>
        )
    })

    const renderedUsers = project['Authorized Users'].map((user) => {
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
  