import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Sht30Card } from "./components/Sht30Card";
import { Cj702Card } from "./components/Cj702Card";
import { TemperatureChart } from "./components/TemperatureChart";
import { AirQualityChart } from "./components/AirQualityChart";
import { useMqtt } from "./hooks/useMqtt";

function App() {
  const { connected, sht30, cj702, sht30History, cj702History } = useMqtt();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ESP32-P4 传感器仪表盘
          </Typography>
          <Chip
            label={connected ? "已连接" : "未连接"}
            color={connected ? "success" : "error"}
            size="small"
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#fff", fontWeight: 500 }}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Sht30Card data={sht30} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Cj702Card data={cj702} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TemperatureChart sht30History={sht30History} cj702History={cj702History} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AirQualityChart history={cj702History} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
