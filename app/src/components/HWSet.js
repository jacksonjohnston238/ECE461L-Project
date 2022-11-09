import { TextField, Button, Stack, Box } from "@mui/material"
import { useState } from "react"

function HWSet({hwset, project, joined, setUpdateProjects, updateProjects}) {
    const hwsetName = hwset.Name
    const capacity = hwset.Capacity
    const availability = hwset.Availability
    const projectid = project.ProjectID
    const projectName = project.ProjectName
    const [quantity, setQuantity] = useState(0)
    const url = process.env.REACT_APP_BASE_URL 

    const checkInHandler = () => {
      if (!joined) {
        alert(`You must join ${projectName} to check in hardware`)
      } else {
        // send qty update to backend
        fetch(`${url}checkin/${projectid}/${hwsetName}/${quantity}`)
          .then((response) => response.json())
          .then((data) => {
            alert(data.response)
            setUpdateProjects(!updateProjects)
          })
        setQuantity(0)
      }
    }

    const checkOutHandler = () => {
      if (!joined) {
        alert(`You must join ${projectName} to check out hardware`)
      } else {
        fetch(`${url}checkout/${projectid}/${hwsetName}/${quantity}`)
          .then((response) => response.json())
          .then((data) => {
            alert(data.response)
            setUpdateProjects(!updateProjects)
          })
        setQuantity(0)
      }
    }
    console.log(hwsetName, project.HWSets.hwsetName)
    return (
        <Stack direction='row' spacing={2}  >
          <Stack>
            <Box sx={{ width: 150 }}>{hwsetName}: {availability}/{capacity}</Box>
            <Box sx={{ width: 150 }}>Checked Out: {project.HWSets[hwsetName]}</Box>
          </Stack>
          <TextField sx={{ maxWidth: 150 }} value={quantity === 0 ? '' : quantity} type="number" id="outlined-basic" helperText="Enter Quantity" variant="outlined" onChange={(e) => {
            if (e.target.value < 0) { 
              e.target.value = 0
            }
            if (e.target.value > capacity) {
              e.target.value = capacity
            }
            setQuantity(e.target.value)
          }} />
          <Button variant="outlined" onClick={checkInHandler} sx={{ maxHeight: 55, ':hover': {bgcolor: 'primary.main', color: 'white'}}}>Check In</Button>
          <Button variant="outlined" onClick={checkOutHandler} sx={{ maxHeight: 55, ':hover': {bgcolor: 'primary.main', color: 'white'}}}>Check Out</Button>
        </Stack>
    )
  }
  
  export default HWSet
  