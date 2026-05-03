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
              <Typography variant="h3" color="primary">
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
              <Typography variant="h3" color="info.main">
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
