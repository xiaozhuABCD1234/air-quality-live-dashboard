import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import DeviceThermostat from "@mui/icons-material/DeviceThermostat";
import type { Sht30Data } from "../types/sensor";

interface Props {
  data: Sht30Data | null;
}

function tempColor(t: number): string {
  if (t < 10) return "info.main";
  if (t < 25) return "success.main";
  if (t < 35) return "warning.main";
  return "error.main";
}

function humidityColor(h: number): string {
  if (h < 30 || h > 70) return "warning.main";
  return "success.main";
}

export function Sht30Card({ data }: Props) {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<DeviceThermostat color="primary" />}
        title="SHT30 温湿度传感器"
        slotProps={{ title: { variant: "subtitle1" } }}
      />
      <CardContent>
        <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            {data ? (
              <Typography variant="h3" sx={{ color: tempColor(data.temperature) }}>
                {data.temperature.toFixed(1)}°C
              </Typography>
            ) : (
              <Skeleton variant="text" width={120} height={50} />
            )}
            <Typography variant="body2" color="text.secondary">
              温度
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {data ? (
              <Typography variant="h3" sx={{ color: humidityColor(data.humidity) }}>
                {data.humidity.toFixed(1)}%
              </Typography>
            ) : (
              <Skeleton variant="text" width={120} height={50} />
            )}
            <Typography variant="body2" color="text.secondary">
              湿度
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
