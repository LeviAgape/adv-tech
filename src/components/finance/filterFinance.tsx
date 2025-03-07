import {
  OutlinedInput,
  Toolbar,
  InputAdornment,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";

import { FilterProcessFinance } from "../process/interfaceProcess";
const API_URL = import.meta.env.VITE_API_URL;

export const FilterFinance = () => {
  const [finances, setFinances] = useState<FilterProcessFinance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFinances, setFilteredFinances] = useState<
    FilterProcessFinance[]
  >([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchFinances = async () => {
    if (!searchTerm) return;
    try {
      const response = await axios.get(`${API_URL}/process/${searchTerm}`, {
        headers: { "Content-Type": "application/json" },
      });
      setFilteredFinances(response.data);
    } catch (error) {
      console.error("Erro ao buscar finanças:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchFinances();
    }
  };

  const handleSearchClick = () => {
    fetchFinances();
  };

  return (
    <>
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
          onKeyDown={handleKeyDown}
          placeholder="Pesquise o cliente"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClick} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Toolbar>

      {/* Tabela para exibir os dados */}
      <Table sx={{ width: "50%", height: "50%", marginTop: "10%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Número do Processo</TableCell>
            <TableCell>Nome do Réu</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Parcelas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFinances.map((finance) => (
            <TableRow key={finance.numberProcess}>
              <TableCell>{finance.numberProcess}</TableCell>
              <TableCell>{finance.defendantName}</TableCell>
              <TableCell>{finance.value}</TableCell>
              <TableCell>{finance.portion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
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
