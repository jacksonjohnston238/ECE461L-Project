import Project from "./Project"
import { Stack, Box } from "@mui/system"
import ProjectMenu from "./ProjectMenu"
import { useEffect, useState } from 'react'

function Projects({user}) {
  const url = process.env.REACT_APP_BASE_URL 
  const [projects, setProjects] = useState([])
  const [hwsets, setHwsets] = useState([])

  useEffect(() => {
    fetch(`${url}projects/${user}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects)
        setHwsets(data.hwsets)
      })
  }, [])

  if (projects === []) {
    return <Box></Box>
  }

  const renderedProjects = projects.map((project) => {
    return (
      <Project 
        key={project.ProjectID}
        projectid={project.ProjectID} 
        name={project.ProjectName} 
        users={project['Authorized Users']} 
        hwsets={hwsets}
        userInProject={project.Users.includes(user) ? true : false}>
      </Project>
    )
  })

  return (
    <Box sx={{ p: 10}}>
      <Stack spacing={5}>
        <ProjectMenu></ProjectMenu>
        <Stack sx={{ border: 1, borderColor: 'black', p: 5 }} spacing={2}>
            <Box sx={{ fontWeight: 500 }}>Projects</Box>
            <Stack spacing={2}>
              {renderedProjects}
            </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Projects
