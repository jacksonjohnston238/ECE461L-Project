import { useState } from "react"
import { Stack, Box, TextField, Button, Link } from "@mui/material"

function ProjectMenu(){
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [projectID, setProjectID] = useState('')
    const [authorizedUsers, setAuthorizedUsers] = useState('')

    const handleProjectCreate = () => {
    }

    return(
    <Box>
        <Stack sx={{ border: 1, borderColor: 'black', p: 5 }} spacing={2}>
          <Box sx={{ fontWeight: 500 }}>Create Project</Box>
          <Stack direction='row' spacing={2} sx={{ border: 1, borderColor: 'lightblue', p: 2}}>
          <Box sx={{ fontWeight: 500}}>
            Project Name
            <TextField value={projectName === 0 ? '' : projectName} type="string" id="outlined-basic" label="Enter Name" variant="filled" onChange={(e) =>{
                setProjectName(e.target.value)
            }}/>
          </Box>
          <Box sx={{ fontWeight: 500 }}>
            Description
            <TextField value={description === 0 ? '' : description} type="string" id="outlined-basic" label="Enter Description" variant="filled" onChange={(e) =>{
                setDescription(e.target.value)
            }}/>
          </Box>
            
          <Box sx={{ fontWeight: 500 }}>
            Project ID
            <TextField value={projectID === 0 ? '' : projectID} type="string" id="outlined-basic" label="Enter Project ID" variant="filled" onChange={(e) =>{
                setProjectID(e.target.value)
            }}/>
           </Box>
           <Box sx={{ fontWeight: 500 }}>
            Authorized Users
            <TextField value={authorizedUsers === 0 ? '' : authorizedUsers} type="string" id="outlined-basic" label="Ex: userid1, userid2, ..." variant="filled" onChange={(e) =>{
                setAuthorizedUsers(e.target.value)
            }}/>
           </Box>
        </Stack>
        <Button variant='contained' size= 'large'
                    onClick={handleProjectCreate}>
                    Create Project
                </Button>
      </Stack>
    </Box>
    )
}

export default ProjectMenu