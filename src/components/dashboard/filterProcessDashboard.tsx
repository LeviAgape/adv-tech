import { Box, Typography, Card } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconAvailable from "../../assets/IconAvailable.png";
import IconPending from "../../assets/IconPending.png";
import IconLoading from "../../assets/IconLoading.png";

const fetchProcesses = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/process`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os processos:", error);
    throw error;
  }
};

export const FilterProcessDashBoard = () => {
  const [availableCount, setAvailableCount] = useState(0);
  const [processCount, setProcessCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProcesses = async () => {
      try {
        const data = await fetchProcesses();
        const availableProcesses = data.filter(
          (process: any) => process.status === "available"
        );
        setAvailableCount(availableProcesses.length);

        const processingProcesses = data.filter(
          (process: any) => process.status === "processing"
        );
        setProcessCount(processingProcesses.length);

        const pendingProcesses = data.filter(
          (process: any) => process.pending != null && process.pending !== ""
        );
        setPendingCount(pendingProcesses.length);
      } catch (error) {
        console.error("Erro ao carregar os processos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProcesses();
  }, []);

  const counters = [
    {
      label: "Processos Disponíveis",
      value: availableCount,
      bgColor: "linear-gradient(to bottom, #A8E6A1, #C7F3C1)",
      icon: IconAvailable,
    },
    {
      label: "Em Progresso",
      value: processCount,
      bgColor: "linear-gradient(to bottom, #FFE58A, #FFF6CC)",
      icon: IconLoading,
    },
    {
      label: "Pendentes",
      value: pendingCount,
      bgColor: "linear-gradient(to bottom, #FF8A8A, #FFB3B3)",
      icon: IconPending,
    },
  ];

  return (
    <Box>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {counters.map((counter, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                maxWidth: 300,
                minHeight: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                p: 4,
                boxShadow: "none",
                background: counter.bgColor,
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <img src={counter.icon} alt={`${counter.label} icon`} />
              <Typography
                sx={{
                  color: "black",
                  fontSize: 18,
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                {counter.label}
              </Typography>
              <Typography
                sx={{
                  typography: "h4",
                  color: "text.primary",
                  fontWeight: "bold",
                }}
              >
                {counter.value}
              </Typography>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};
