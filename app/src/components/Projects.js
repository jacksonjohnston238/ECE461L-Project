import Project from "./Project"
import { Stack, Box } from "@mui/system"
import ProjectMenu from "./ProjectMenu"
import { useEffect, useState } from 'react'
import Select from "react-select"

function Projects({user}) {
  const url = 'http://localhost:5000/' // use for local development
    // const url = '/' // use for heroku deployment
  const [projects, setProjects] = useState([])
  const [hwsets, setHwsets] = useState([])
  const [selectedProject, setSelectedProject] = useState([])

  useEffect(() => {
    fetch(`${url}projects/${user}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects)
        setHwsets(data.hwsets)
      })
      setSelectedProject(renderedProjects[0])
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

  var authorizedProjects = projects.map((project, index) => {
    var option = {
    label: project.ProjectName + " (" + project.ProjectID + ")", value: index
    }
    return option;
  })

  authorizedProjects.unshift({label: "Display all Projects", value: null})

  return (
    <Box sx={{ p: 10}}>
      <Stack spacing={5}>
        <ProjectMenu></ProjectMenu>
        <Stack sx={{ border: 1, borderColor: 'black', p: 5 }} spacing={2}>
            <Box sx={{ fontWeight: 500 }}>Projects</Box>
            <Select options={authorizedProjects} placeholder={'Project Name (ProjectID)'} onChange={(choice) =>{
                if(choice.value == null){
                  setSelectedProject(renderedProjects)
                }else{
                  setSelectedProject(renderedProjects[choice.value])
                }
            }}/>
            <Stack spacing={2}>
              {selectedProject}
            </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Projects
