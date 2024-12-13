
import { UserDashboard } from './feature/users/components/UserDashboard'
import { AppBar, Box, Container, Grid2 as Grid, Toolbar, Typography, styled } from '@mui/material'
import { DarkModeToggler } from './theme/DarkModeToggler'
import { BarChart } from './feature/users/viz/BarChart'

function App() {

  return (
    <>

      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HeartBeat
          </Typography>
          <DarkModeToggler />
        </Toolbar>
      </AppBar>

      <Container>
        <Toolbar />
        <Grid container spacing={2} columns={16} >
          <Grid size={8} sx={{ height: '25vh' }}>
            <BarChart />
          </Grid>
          <Grid size={8}>
            <Box>Box 2</Box>
          </Grid>
          <Grid size={16} sx={{ height: '58vh' }}>
            <UserDashboard />
          </Grid>
        </Grid>
      </Container>




    </>
  )
}

export default App
