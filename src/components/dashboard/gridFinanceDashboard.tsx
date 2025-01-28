import { Box, Typography } from "@mui/material";
import { Finance } from "../finance/interfaceFinance";  // A interface já está importada corretamente
import axios from "axios";
import { useEffect, useState } from "react";

const fetchFinances = async (): Promise<Finance[]> => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}finance`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar finanças:", error);
    throw error;
  }
};

export const GridFinanceDashboard = () => {
  const [finances, setFinances] = useState<Finance[]>([]);

  useEffect(() => {
    const loadFinances = async () => {
      try {
        const data = await fetchFinances();
        setFinances(data);
      } catch (error) {
        console.error("Erro ao carregar finanças:", error);
      }
    };
    loadFinances();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Finance Data</Typography>
      {finances.length > 0 ? (
        finances.map((finance, index) => (
          <Box key={index}>
            <Typography variant="body1">Value: {finance.value}</Typography>
            <Typography variant="body1">Portion: {finance.portion}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">Nenhuma informação disponível.</Typography>
      )}
    </Box>
  );
};
