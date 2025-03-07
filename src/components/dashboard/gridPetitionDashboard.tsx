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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Petition } from "../petition/interfacePetition";

const API_URL = import.meta.env.VITE_API_URL;

const fetchPetitions = async (): Promise<Petition[]> => {
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

const editPetitions = async (): Promise<Petition[]> => {
  try {
    const response = await axios.put(`${API_URL}/petition`, {
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

export const GridPetitionDashboard = () => {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(
    null
  );

  useEffect(() => {
    const loadPetitions = async () => {
      try {
        const data = await fetchPetitions();
        setPetitions(data);
      } catch (error) {
        console.error("Erro ao carregar as petições:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPetitions();
  }, []);

  const handleOpen = (petition: Petition) => {
    setSelectedPetition(petition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPetition(null);
  };

  const handleSave = async () => {
    if (selectedPetition) {
      try {
        const updatedPetition = await axios.put(
          `${API_URL}/petition/${selectedPetition.id}`,
          selectedPetition,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setPetitions((prevPetitions) =>
          prevPetitions.map((petition) =>
            petition.id === selectedPetition.id
              ? updatedPetition.data
              : petition
          )
        );

        handleClose();
      } catch (error) {
        console.error("Erro ao salvar as alterações:", error);
      }
    }
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}
    >
      {loading ? (
        <Typography textAlign="center">Carregando...</Typography>
      ) : petitions.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "30vh", overflow: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Advogado</TableCell>
                <TableCell>Réu</TableCell>
                <TableCell>Tipo de Processo</TableCell>
                <TableCell>Parceiro</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {petitions.map((petition) => (
                <TableRow key={petition.id}>
                  <TableCell>{petition.author}</TableCell>
                  <TableCell>{petition.defendantName}</TableCell>
                  <TableCell>{petition.processType}</TableCell>
                  <TableCell>{petition.partner}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(petition)}>Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography textAlign="center">Nenhuma petição encontrada.</Typography>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Editar Petição
          </Typography>
          {selectedPetition && (
            <>
              <TextField
                label="Advogado"
                fullWidth
                value={selectedPetition.author}
                onChange={(e) =>
                  setSelectedPetition({
                    ...selectedPetition,
                    author: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Réu"
                fullWidth
                value={selectedPetition.defendantName}
                onChange={(e) =>
                  setSelectedPetition({
                    ...selectedPetition,
                    defendantName: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Tipo de Processo"
                fullWidth
                value={selectedPetition.processType}
                onChange={(e) =>
                  setSelectedPetition({
                    ...selectedPetition,
                    processType: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Parceiro"
                fullWidth
                value={selectedPetition.partner}
                onChange={(e) =>
                  setSelectedPetition({
                    ...selectedPetition,
                    partner: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
              >
                Salvar Alterações
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
