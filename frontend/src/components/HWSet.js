import { TextField, Button, Stack, Box } from "@mui/material"
import { useState } from "react"

function HWSet({name, capacity, availability}) {
    const [hwAvailability, setHwAvailability] = useState(availability)
    const [quantity, setQuantity] = useState(0)

    const checkInHandler = () => {
      const newAvailiability = Number(hwAvailability) + Number(quantity)
      if (newAvailiability > capacity) {
        setHwAvailability(capacity)
      } else {
        setHwAvailability(newAvailiability)
      }
      setQuantity(0)
    }

    const checkOutHandler = () => {
      if (quantity > hwAvailability) {
        setHwAvailability(0)
      } else {
        setHwAvailability(hwAvailability - quantity)
      }
      setQuantity(0)
    }

    return (
        <Stack direction='row' spacing={2}>
          <Box sx={{ width: 150 }}>{name}: {hwAvailability}/{capacity}</Box>
          <TextField value={quantity === 0 ? '' : quantity} type="number" id="outlined-basic" label="Enter Quantity" variant="outlined" onChange={(e) => {
            if (e.target.value < 0) { 
              e.target.value = 0
            }
            if (e.target.value > capacity) {
              e.target.value = capacity
            }
            setQuantity(e.target.value)
          }} />
          <Button variant="outlined" onClick={checkInHandler}>Check In</Button>
          <Button variant="outlined" onClick={checkOutHandler}>Check Out</Button>
        </Stack>
    )
  }
  
  export default HWSet
  