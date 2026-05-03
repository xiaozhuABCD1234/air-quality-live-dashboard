import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import ShowChart from "@mui/icons-material/ShowChart";
import { LineChart } from "@mui/x-charts/LineChart";
import type { Timestamped, Sht30Data } from "../types/sensor";

interface Props {
  history: Timestamped<Sht30Data>[];
}

interface ChartItem {
  index: number;
  temp: number;
  hum: number;
  [key: string]: unknown;
}

export function TemperatureChart({ history }: Props) {
  if (history.length === 0) {
    return (
      <Card variant="outlined">
        <CardHeader
          avatar={<ShowChart color="primary" />}
          title="温湿度趋势"
          slotProps={{ title: { variant: "subtitle1" } }}
        />
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <Skeleton variant="rounded" height={300} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  const chartData: ChartItem[] = history.map((entry, i) => ({
    index: i,
    temp: entry.value.temperature,
    hum: entry.value.humidity,
  }));

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<ShowChart color="primary" />}
        title="温湿度趋势"
        slotProps={{ title: { variant: "subtitle1" } }}
      />
      <CardContent>
        <LineChart
          dataset={chartData}
          xAxis={[{ dataKey: "index", scaleType: "point", position: "none" }]}
          yAxis={[
            { id: "temp", position: "left", label: "温度 (°C)" },
            { id: "hum", position: "right", label: "湿度 (%RH)" },
          ]}
          series={[
            { dataKey: "temp", label: "温度 °C", color: "#e53935", curve: "catmullRom", yAxisId: "temp" },
            { dataKey: "hum", label: "湿度 %RH", color: "#1e88e5", curve: "catmullRom", yAxisId: "hum" },
          ]}
          height={300}
          grid={{ horizontal: true }}
          margin={{ top: 10, right: 70, bottom: 30, left: 55 }}
          skipAnimation
        />
      </CardContent>
    </Card>
  );
}
