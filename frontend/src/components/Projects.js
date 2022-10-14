import Project from "./Project"
import { Stack, Box } from "@mui/system"

function Projects() {
  return (
    <Box sx={{ p: 15}}>
      <Stack sx={{ border: 1, borderColor: 'black', p: 5 }} spacing={2}>
          <Box sx={{ fontWeight: 500 }}>Projects</Box>
          <Stack spacing={2}>
              <Project name={'Project 1'} users={'bmw3555, abc1234'} hwsets={['HWSet1', 'HWSet2']}></Project>
              <Project name={'Project 2'} users={'xyz5678, hlm5005'} hwsets={['MyHWSet', 'HWSet3']}></Project>
              <Project name={'Project 3'} users={'bmw3555, tre2280'} hwsets={['HWSetA', 'HWSetB']}></Project>
          </Stack>
      </Stack>
    </Box>
  )
}

export default Projects
