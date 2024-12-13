
import { UserDashboard } from './feature/users/components/UserDashboard'
import { AppBar, Box, Container, Grid2 as Grid, Toolbar, Typography, styled } from '@mui/material'
import { DarkModeToggler } from './theme/DarkModeToggler'
import { BarChart } from './feature/users-vis/components/BarChart'
import { GenderDistributionChart } from './feature/users-vis/components/GenderDistributionChart'
import { CityDistributionChart } from './feature/users-vis/components/CityDistributionChart'

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
            <GenderDistributionChart />
          </Grid>
          <Grid size={8} sx={{ height: '25vh' }}>
            <CityDistributionChart />
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
