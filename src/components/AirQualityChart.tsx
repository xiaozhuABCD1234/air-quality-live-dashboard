import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Timeline from "@mui/icons-material/Timeline";
import { LineChart } from "@mui/x-charts/LineChart";
import type { Timestamped, Cj702Data } from "../types/sensor";

interface Props {
  history: Timestamped<Cj702Data>[];
}

interface ChartItem {
  index: number;
  eco2: number;
  tvoc: number;
  pm25: number;
  [key: string]: unknown;
}

export function AirQualityChart({ history }: Props) {
  if (history.length === 0) {
    return (
      <Card variant="outlined">
        <CardHeader
          avatar={<Timeline color="primary" />}
          title="空气质量趋势"
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
    eco2: entry.value.eco2,
    tvoc: entry.value.tvoc,
    pm25: entry.value.pm25,
  }));

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Timeline color="primary" />}
        title="空气质量趋势"
        slotProps={{ title: { variant: "subtitle1" } }}
      />
      <CardContent>
        <LineChart
          dataset={chartData}
          xAxis={[{ dataKey: "index", scaleType: "point", position: "none" }]}
          yAxis={[
            { id: "eco2", position: "left", label: "eCO₂ / PM2.5" },
            { id: "tvoc", position: "right", label: "TVOC (ppb)" },
          ]}
          series={[
            { dataKey: "eco2", label: "eCO₂ ppb", color: "#43a047", curve: "catmullRom", yAxisId: "eco2" },
            { dataKey: "tvoc", label: "TVOC ppb", color: "#fb8c00", curve: "catmullRom", yAxisId: "tvoc" },
            { dataKey: "pm25", label: "PM2.5 µg/m³", color: "#8e24aa", curve: "catmullRom", yAxisId: "eco2" },
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
