import {
  Box,
  Button,
  OutlinedInput,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterProcessFinance } from "../process/interfaceProcess";

export const GridFinanceDashboard = () => {
  const [finances, setFinances] = useState<FilterProcessFinance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFinances, setFilteredFinances] = useState<FilterProcessFinance[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchFinances = async () => {
      if (!searchTerm) {
        setFilteredFinances(finances);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/process/${searchTerm}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setFilteredFinances(response.data);
      } catch (error) {
        console.error("Erro ao buscar finanças:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchFinances();
    }, 100); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, finances]);

  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <OutlinedInput
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange} 
        placeholder="Pesquise o cliente"
      />
    </Toolbar>
  );
};


{
  /* <Typography variant="h6">Finance Dashboard</Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          label="Buscar por Réu"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button sx={{backgroundColor:"#C0C0C0"}} onClick={fetchFinances}>
          Pesquisar
        </Button>
      </Box>

      {filteredFinances.length > 0 ? (
        filteredFinances.map((finance, index) => (
          <Box key={index} p={2} border="1px solid #ddd" borderRadius="8px" mb={2}>
            <Typography variant="body1">Processo: {finance.numberProcess}</Typography>
            <Typography variant="body1">Réu: {finance.defendantName}</Typography>
            <Typography variant="body1">Valor: R$ {finance.value}</Typography>
            <Typography variant="body1">Parcelas: {finance.portion}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">Nenhuma informação disponível.</Typography>
      )} */
}
