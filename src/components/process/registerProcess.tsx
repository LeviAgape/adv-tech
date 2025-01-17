import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import axios from "axios";
import { Process } from "./interfaceProcess";
import { useState } from "react";
import { fieldMap } from "./fieldMapProcess-utils";

const translations: Record<
  Process["status"] | Process["processOutcome"],
  string
> = {
  available: "Disponível",
  archived: "Arquivado",
  processing: "Em andamento",
  won: "Causa ganha",
  lost: "Causa perdida",
  undefined: "Indefinido",
};

export const RegisterProcess = () => {
  const [formData, setFormData] = useState<Process>({
    numberProcess: "teste",
    forumName: "teste",
    courtName: "teste",
    courtNumber: "teste",
    author: "teste",
    defendantName: "teste",
    processStatus: "teste",
    status: "processing",
    pending: "teste",
    note: "teste",
    processDate: "2023-01-01",
    partner: "teste",
    department: "teste",
    processOutcome: "undefined",
    value: 10,
    portion: 1,
  });
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/process`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Erro ao registrar o processo:", error);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  return (
    <Box>
      {fieldMap.map((field) => {
        if (field.type === "select") {
          return (
            <FormControl
              fullWidth
              margin="normal"
              key={field.name}
              sx={{ width: "40%", margin: 2, fontFamily: "montserrat" }}
            >
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={formData[field.name as keyof Process]}
                onChange={handleSelectChange}
                name={field.name}
                label={field.label}
              >
                {(field.choose || field.options)?.map((option) => (
                  <MenuItem value={option} key={option}>
                    {translations[
                      option as Process["status"] | Process["processOutcome"]
                    ] || option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }
        return (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            value={formData[field.name as keyof Process]}
            onChange={handleChange}
            margin="normal"
            type={field.type}
            sx={{
              width: "40%",
              margin: 2,
              fontSize: 36,
              fontFamily: "montserrat",
            }}
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
            "&:hover": {
              backgroundColor: "#8a735a",
            },
          }}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
};
