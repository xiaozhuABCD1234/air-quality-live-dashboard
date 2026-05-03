import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <Box className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <Card className="max-w-sm shadow-lg">
        <CardContent className="flex flex-col items-center gap-4">
          <Typography variant="h5" className="font-bold">
            ESP32-P4 Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            MUI v9 + Tailwind v4 集成测试
          </Typography>
          <Button variant="contained" className="mt-2 w-full">
            连接 MQTT
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
