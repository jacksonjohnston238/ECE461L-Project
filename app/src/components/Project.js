import { Button } from "@mui/material"
import { Stack, Box } from "@mui/system"
import HWSet from "./HWSet"
import { useState } from "react"

function Project({name, hwsets, users}) {
    const [joined, setJoined] = useState(false)

    return (
        <Stack direction='row' spacing={2} sx={{ border: 1, borderColor: 'lightblue', p: 2}}>
            <Box sx={{ fontWeight: 500, width: 100 }}>{name}</Box>
            <Box sx={{ fontWeight: 300, width: 200 }}>{users}</Box>
            <Stack spacing={2}>
                <HWSet name={hwsets[0]} availability={50} capacity={100} />
                <HWSet name={hwsets[1]} availability={10} capacity={100} />
            </Stack>
            {!joined ? 
                <Button variant='contained' onClick={() => setJoined(true)}>Join Project</Button> 
                : 
                <Button variant='contained' onClick={() => setJoined(false)}>Leave Project</Button>
            }
        </Stack>
    )
  }
  
  export default Project
  