import { useState } from "react"
import { Stack, Box, TextField, Button, Link } from "@mui/material"

function ProjectMenu(){
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [projectID, setProjectID] = useState('')
    const [authorizedUsers, setAuthorizedUsers] = useState('')

    return(
    <Box sx={{ p: 15}}>
        <Stack sx={{ border: 1, borderColor: 'black', p: 5 }} spacing={2}>
          <Box sx={{ fontWeight: 500 }}>Create Project</Box>
          <Stack direction='row' spacing={2} sx={{ border: 1, borderColor: 'lightblue', p: 2}}>
            <h2>Name</h2>
            <TextField value={projectName === 0 ? '' : projectName} type="string" id="outlined-basic" label="Enter Name" variant="outlined" onChange={(e) =>{
                setProjectName(e.target.value)
            }}/>
            <h2>Description</h2>
            <TextField value={description === 0 ? '' : description} type="string" id="outlined-basic" label="Enter Description" variant="outlined" onChange={(e) =>{
                setDescription(e.target.value)
            }}/>
            <h2>ProjectID</h2>
            <TextField value={projectID === 0 ? '' : projectID} type="string" id="outlined-basic" label="Enter Project ID" variant="outlined" onChange={(e) =>{
                setProjectID(e.target.value)
            }}/>
            <h2>Authorized Users</h2>
            <TextField value={authorizedUsers === 0 ? '' : authorizedUsers} type="string" id="outlined-basic" label="Enter Password" variant="outlined" onChange={(e) =>{
                setAuthorizedUsers(e.target.value)
            }}/>
        </Stack>
      </Stack>
    </Box>
    )
}

export default ProjectMenu