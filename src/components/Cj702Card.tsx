import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import Air from "@mui/icons-material/Air";
import type { Cj702Data } from "../types/sensor";

interface Props {
  data: Cj702Data | null;
}

interface FieldDef {
  label: string;
  key: keyof Cj702Data;
  unit: string;
  decimals?: number;
  color: (v: number) => string;
}

const TEMP_COLOR = (t: number) => t < 10 ? "info.main" : t < 25 ? "success.main" : t < 35 ? "warning.main" : "error.main";
const HUM_COLOR = (h: number) => h >= 30 && h <= 70 ? "success.main" : "warning.main";
const GOOD_WARN = (good: number, warn: number) => (v: number) =>
  v < good ? "success.main" : v < warn ? "warning.main" : "error.main";

const FIELDS: FieldDef[] = [
  { label: "eCO₂", key: "eco2", unit: "ppb", color: GOOD_WARN(800, 1200) },
  { label: "eCH₂O", key: "ech2o", unit: "ppb", color: GOOD_WARN(60, 120) },
  { label: "TVOC", key: "tvoc", unit: "ppb", color: GOOD_WARN(300, 600) },
  { label: "PM2.5", key: "pm25", unit: "µg/m³", color: GOOD_WARN(35, 75) },
  { label: "PM10", key: "pm10", unit: "µg/m³", color: GOOD_WARN(50, 150) },
  { label: "温度", key: "temperature", unit: "°C", decimals: 1, color: TEMP_COLOR },
  { label: "湿度", key: "humidity", unit: "%RH", decimals: 1, color: HUM_COLOR },
];

export function Cj702Card({ data }: Props) {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Air color="primary" />}
        title="CJ702 空气质量传感器"
        slotProps={{ title: { variant: "subtitle1" } }}
      />
      <CardContent sx={{ p: 0 }}>
        <Table size="small">
          <TableBody>
            {FIELDS.map(({ label, key, unit, decimals, color }) => (
              <TableRow key={key}>
                <TableCell sx={{ fontWeight: 500 }}>{label}</TableCell>
                <TableCell align="right" sx={{ color: data ? color(data[key]) : undefined }}>
                  {data ? (
                    `${data[key].toFixed(decimals ?? 0)} ${unit}`
                  ) : (
                    <Skeleton variant="text" width={100} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
