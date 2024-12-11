import { useState } from 'react'
import { UserDashboard } from './feature/users/components/UserDashboard'
import { AppBar, Box, Container, Grid2 as Grid, Toolbar, Typography, styled } from '@mui/material'
import { DarkModeToggler } from './theme/DarkModeToggler'

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

      <Container sx={{ marginTop: "4em" }}>

        <Grid container spacing={2} columns={16}>
          <Grid size={8}>
            <Box>Box 1</Box>
          </Grid>
          <Grid size={8}>
            <Box>Box 2</Box>
          </Grid>
          <Grid size={16}>
            <UserDashboard />
          </Grid>
        </Grid>

      </Container>

    </>
  )
}

export default App
