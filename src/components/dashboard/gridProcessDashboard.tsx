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
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Process } from "../process/interfaceProcess";
import { nameTranslatedInGrid } from "./gridProcessDashboard-utils";
import { translatedStatus } from "./gridProcessDashboard-utils";
import { formFields } from "./gridProcessDashboard-utils";

const API_URL = import.meta.env.VITE_API_URL;

const fetchProcesses = async (): Promise<Process[]> => {
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
export const GridProcessDashboard = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);

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

  const handleOpen = (process: Process) => {
    setSelectedProcess(process);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedProcess(null), 300);
  };

  const handleSave = async () => {
    if (!selectedProcess) return;

    try {
      const updatedProcess = await axios.put(
        `${API_URL}/process/${selectedProcess.id}`,
        selectedProcess,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setProcesses((prevProcess) =>
        prevProcess.map((process) =>
          process.id === selectedProcess.id ? updatedProcess.data : process
        )
      );

      handleClose();
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}
    >
      {loading ? (
        <Typography textAlign="center">Carregando...</Typography>
      ) : processes.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "30vh", overflow: "auto", maxWidth: "100vw" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {nameTranslatedInGrid.map((name, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: "#C0C0C0",
                      color: "black",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    {name.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {processes.map((process) => (
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
                    <Button
                      onClick={() => handleOpen(process)}
                      sx={{
                        backgroundColor: "#C0C0C0",
                        borderRadius: 18,
                        color: "black",
                        minHeight: 40,
                        minWidth: 70,
                      }}
                    >
                      Editar
                    </Button>,
                  ].map((value, idx) => (
                    <TableCell sx={{ fontSize: 16 }} key={idx}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography textAlign="center">Nenhum processo encontrado.</Typography>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "80vh",
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={2}>
            Editar Processo
          </Typography>

          <Box sx={{ maxHeight: "65vh", overflowY: "auto" }}>
            {formFields.map((field) =>
              field.type === "select" ? (
                <FormControl fullWidth sx={{ mb: 2 }} key={field.key}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={selectedProcess?.[field.key] || ""}
                    onChange={(e) =>
                      setSelectedProcess((prev) =>
                        prev ? { ...prev, [field.key]: e.target.value } : prev
                      )
                    }
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  key={field.key}
                  label={field.label}
                  fullWidth
                  value={selectedProcess?.[field.key] || ""}
                  onChange={(e) =>
                    setSelectedProcess((prev) =>
                      prev ? { ...prev, [field.key]: e.target.value } : prev
                    )
                  }
                  sx={{ mb: 2 }}
                />
              )
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
