import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Process } from "../process/interfaceProcess";
import { nameTranslatedInGrid } from "./gridProcessDashboard-utils";
import { translatedStatus } from "./gridProcessDashboard-utils";
import { translatedProcessOutCome } from "./gridProcessDashboard-utils";

const fetchProcesses = async (): Promise<Process[]> => {
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

export const GridProcessDashboard = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProcesses = async () => {
      try {
        const data = await fetchProcesses();
        setProcesses(data);
      } catch (error) {
        console.error("Erro ao carregar os processos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProcesses();
  }, []);

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}
    >
      {loading ? (
        <Typography textAlign="center">Carregando...</Typography>
      ) : processes.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "70vh", overflow: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {nameTranslatedInGrid.map((name, index) => (
                  <TableCell
                    key={index}
                    sx={{ backgroundColor: "#C0C0C0", fontWeight: 700, fontSize: 16 }}
                  >
                    {name.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {processes.map((process) => {
                return (
                  <TableRow key={process.numberProcess}>
                    {[
                      process.numberProcess,
                      process.forumName,
                      process.courtName,
                      process.courtNumber,
                      process.author,
                      process.defendantName,
                      process.processStatus,
                      translatedStatus(process.status),
                      process.pending || "Sem pendências",
                      process.note || "Sem observações",
                      new Date(process.processDate).toLocaleDateString(),
                      process.partner,
                      process.department,
                      translatedProcessOutCome(process.processOutcome),
                      <Button
                        sx={{
                          backgroundColor: "#C0C0C0",
                          borderRadius: 18,
                          color: "black",
                          minHeight: 40,
                          minWidth: 70,
                        }}
                      >
                        <Typography sx={{fontSize:12, fontWeight:500, fontFamily:"montserrat"}}> Editar</Typography>
                      </Button>,
                    ].map((value, idx) => (
                      <TableCell sx={{ fontSize: 18 }} key={idx}>
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography textAlign="center">Nenhum processo encontrado.</Typography>
      )}
    </Box>
  );
};
