import { Box, Typography } from "@mui/material";
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
  const [processCount, setProcessCount] = useState(0); // Novo estado para os processos "undefined"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProcesses = async () => {
      try {
        const data = await fetchProcesses();
        // Contagem de processos com status "available"
        const availableProcesses = data.filter(
          (process: any) => process.status === "available"
        );
        setAvailableCount(availableProcesses.length);

        // Contagem de processos com status "undefined"
        const undefinedProcesses = data.filter(
          (process: any) => process.status === "processing"
        );
        setProcessCount(undefinedProcesses.length); // Atualiza o estado com a contagem
      } catch (error) {
        console.error("Erro ao carregar os processos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProcesses();
  }, []);

  return (
    <Box>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <Box>
          {/* Contagem de processos "available" */}
          <Typography>Processos disponíveis:</Typography>
          <Box
            sx={{
              backgroundColor: "#a4906f",
              width: "12%",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Typography>{availableCount}</Typography>
          </Box>

          <Typography>Processos em andamento:</Typography>
          <Box
            sx={{
              backgroundColor: "#8a735a",
              width: "12%",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Typography>{processCount}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
