import { Box, Typography, Card } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconAvailable from "../../assets/IconAvailable.png";
import IconPending from "../../assets/IconPending.png";
import IconLoading from "../../assets/IconLoading.png";
import IconDiary from "../../assets/IconDiary.png";

const API_URL = import.meta.env.VITE_API_URL;

const fetchProcesses = async () => {
  try {
    const response = await axios.get(`${API_URL}/process`, {
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

const fetchPetition = async () => {
  try {
    const response = await axios.get(`${API_URL}/petition`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as petições iniciais:", error);
    throw error;
  }
};

export const FilterProcessDashBoard = () => {
  const [availableCount, setAvailableCount] = useState(0);
  const [processCount, setProcessCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [petitionCount, setPetitionCount] = useState(0);
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

  useEffect(() => {
    const loadPetitions = async () => {
      try {
        const data = await fetchPetition();
        setPetitionCount(data.length);
      } catch (error) {
        console.error("Erro ao carregar as petições iniciais:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPetitions();
  }, []);

  const counters = [
    {
      label: "Petição inicial",
      value: petitionCount,
      bgColor: "linear-gradient(to bottom, #A8E6A1, #C7F3C1)",
      icon: IconDiary,
    },
    {
      label: "Diligencia",
      value: availableCount,
      bgColor: "linear-gradient(to bottom, #A1DFF7, #C1EAF3)",
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
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            paddingTop: 12,
            justifyContent: "space-between",
          }}
        >
          {counters.map((counter, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                maxWidth: 300,
                minWidth: 200,
                minHeight: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                p: 4,
                boxShadow: "none",
                background: counter.bgColor,
                borderRadius: "20px",
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
