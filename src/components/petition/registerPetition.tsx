import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Petition } from "./interfacePetition";
import { useState } from "react";
import axios from "axios";
import { fieldMapPetition } from "./fieldMapPetition-utils";

export const RegisterPetition = () => {
  const [formData, setFormData] = useState<Petition>({
    author: "Levi",
    defendantName: "Luis",
    processType: "Civil",
    partner: "Evelyn",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/petition`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;

      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao registrar a petição:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ paddingTop: 4 }}>
      <Typography
        sx={{
          color: "black",
          fontWeight: 500,
          fontFamily: "montserrat",
          fontSize: 28,
        }}
      >
        Nova petição
      </Typography>
      {fieldMapPetition.map((field) => {
        return (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            margin="normal"
            type={field.type}
            sx={{
              width: "40%",
              margin: 2,
              fontSize: 36,
              fontFamily: "montserrat",
            }}
            value={formData[field.name as keyof Petition]}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        );
      })}
      <Box sx={{ margin: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            backgroundColor: "#a4906f",
            color: "#fff",
            borderRadius: 10,

            "&:hover": {
              backgroundColor: "#8a735a",
            },
          }}
        >
          <Typography
            sx={{ color: "white", fontWeight: 500, fontFamily: "montserrat" }}
          >
            Registrar
          </Typography>
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
            padding: "20px 40px",
            borderRadius: "16px",
            fontSize: "16px",
          }}
        >
          A petição foi registrada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};
