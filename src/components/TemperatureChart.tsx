import { useRef, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import ShowChart from "@mui/icons-material/ShowChart";
import { LineChart } from "@mui/x-charts/LineChart";
import type { Timestamped, Sht30Data, Cj702Data } from "../types/sensor";

interface Props {
  sht30History: Timestamped<Sht30Data>[];
  cj702History: Timestamped<Cj702Data>[];
}

interface ChartItem {
  index: number;
  temp: number;
  hum: number;
  cj702Temp: number;
  cj702Hum: number;
  [key: string]: unknown;
}

const MAX_POINTS = 60;

export function TemperatureChart({ sht30History, cj702History }: Props) {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const idxRef = useRef(0);
  const lastSht30Ts = useRef(0);
  const lastCj702Ts = useRef(0);
  const lastValues = useRef({ temp: 0, hum: 0, cj702Temp: 0, cj702Hum: 0 });
  const sht30Ref = useRef(sht30History);
  const cj702Ref = useRef(cj702History);
  sht30Ref.current = sht30History;
  cj702Ref.current = cj702History;

  useEffect(() => {
    const timer = setInterval(() => {
      const sht30 = sht30Ref.current.at(-1);
      const cj702 = cj702Ref.current.at(-1);

      if (sht30 && sht30.timestamp !== lastSht30Ts.current) {
        lastSht30Ts.current = sht30.timestamp;
        lastValues.current.temp = sht30.value.temperature;
        lastValues.current.hum = sht30.value.humidity;
      }
      if (cj702 && cj702.timestamp !== lastCj702Ts.current) {
        lastCj702Ts.current = cj702.timestamp;
        lastValues.current.cj702Temp = cj702.value.temperature;
        lastValues.current.cj702Hum = cj702.value.humidity;
      }

      const entry: ChartItem = {
        index: idxRef.current++,
        ...lastValues.current,
      };
      setChartData(prev => [...prev, entry].slice(-MAX_POINTS));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (chartData.length === 0) {
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
            { dataKey: "temp", label: "SHT30 温度 °C", color: "#e53935", curve: "catmullRom", yAxisId: "temp" },
            { dataKey: "hum", label: "SHT30 湿度 %RH", color: "#1e88e5", curve: "catmullRom", yAxisId: "hum" },
            { dataKey: "cj702Temp", label: "CJ702 温度 °C", color: "#ef9a9a", curve: "catmullRom", yAxisId: "temp" },
            { dataKey: "cj702Hum", label: "CJ702 湿度 %RH", color: "#90caf9", curve: "catmullRom", yAxisId: "hum" },
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
