import { Box, Typography, Card } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchProcesses = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/process`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Processos recuperados com sucesso:", response.data);
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
      bgColor: "#B5835A", 
    },
    {
      label: "Processos em Andamento",
      value: processCount,
      bgColor: "#B5835A", 
    },
    {
      label: "Processos Pendentes", 
      value: pendingCount,
      bgColor: "#B5835A", 
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
                p: 4, 
                boxShadow: "none", 
                background: `linear-gradient(to bottom, #D4A373, ${counter.bgColor})`, 
                borderRadius: "12px", 
                textAlign: "center", 
              }}
            >
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
