import {
  AppBar,
  Button,
  Container,
  Grid2 as Grid,
  Toolbar,
  Typography,
} from "@mui/material";

import { UserDashboard } from "./feature/users-list/components/UserDashboard";
import { CityDistributionChart } from "./feature/users-vis/components/CityDistributionChart";
import { GenderDistributionChart } from "./feature/users-vis/components/GenderDistributionChart";
import { DarkModeToggler } from "./theme/DarkModeToggler";
import { setUserCreateState } from "./feature/users-list/userListSlice";
import { useAppDispatch } from "./store/storeHooks";

function App() {
  const dispatch = useAppDispatch()
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HeartBeat
          </Typography>
          <Button onClick={() => {
            dispatch(setUserCreateState({}))
          }}>Add New User</Button>
          <DarkModeToggler />
        </Toolbar>
      </AppBar>

      <Container>
        <Toolbar />
        <Grid container spacing={2} columns={16}>
          <Grid size={8} sx={{ height: "25vh" }}>
            <GenderDistributionChart />
          </Grid>
          <Grid size={8} sx={{ height: "25vh" }}>
            <CityDistributionChart />
          </Grid>
          <Grid size={16} sx={{ height: "58vh" }}>
            <UserDashboard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
