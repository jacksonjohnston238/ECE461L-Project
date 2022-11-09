import { useState } from "react"
import { Stack, Box, TextField, Button, Link } from "@mui/material"

function ProjectMenu({updateProjects, setUpdateProjects}){
    const user = localStorage.getItem('user')
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [projectID, setProjectID] = useState('')
    const [authorizedUsers, setAuthorizedUsers] = useState('')
    const url = process.env.REACT_APP_BASE_URL

    const handleProjectCreate = () => {
      let authUsers = authorizedUsers === '' ? user : authorizedUsers
      if (!authUsers.split(',').includes(user)) {
        authUsers += (',' + user)
      }
      if (projectName === '') {
        alert('Please enter Project Name')
      } else if (description === '') {
        alert('Please enter Project Description')
      } else if (projectID === '') {
        alert('Please enter Project ID')
      } else {
        fetch(`${url}createproject/${projectName}/${description}/${projectID}/${authUsers}`)
          .then((response) => response.json())
          .then((data) => {
            alert(data.response)
            setUpdateProjects(!updateProjects)
          }
        )
      }
    }
    
    return(
    <Box>
        <Stack sx={{ border: 1, borderColor: 'black', p: 5, borderRadius: 1 }} spacing={2}>
          <Box sx={{ fontWeight: 500 }}>Create Project</Box>
          <Stack direction='row' spacing={5} sx={{ border: 1, borderColor: 'lightblue', p: 2, borderRadius: 2, justifyContent: 'space-evenly' }}>
          <Box sx={{ fontWeight: 500}}>
            <Stack>
              Project Name
              <TextField value={projectName === 0 ? '' : projectName} type="string" id="outlined-basic" label="Enter Name" variant="filled" onChange={(e) =>{
                  setProjectName(e.target.value)
              }}/>
            </Stack>
          </Box>
          <Box sx={{ fontWeight: 500 }}>
            <Stack>
              Description
              <TextField value={description === 0 ? '' : description} type="string" id="outlined-basic" label="Enter Description" variant="filled" onChange={(e) =>{
                  setDescription(e.target.value)
              }}/>
            </Stack>
          </Box>
            
          <Box sx={{ fontWeight: 500 }}>
            <Stack>
              Project ID
              <TextField value={projectID === 0 ? '' : projectID} type="string" id="outlined-basic" label="Enter Project ID" variant="filled" onChange={(e) =>{
                  setProjectID(e.target.value)
              }}/>
            </Stack>
           </Box>
           <Box sx={{ fontWeight: 500 }}>
           <Stack>
              Authorized Users
              <TextField value={authorizedUsers === 0 ? '' : authorizedUsers} type="string" id="outlined-basic" label="Ex: userid1,userid2,..." variant="filled" onChange={(e) =>{
                  setAuthorizedUsers(e.target.value)
              }}/>
            </Stack>
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