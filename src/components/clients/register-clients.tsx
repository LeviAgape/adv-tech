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

import { Process } from "./interface.clients";
import { useState } from "react";

const fieldMap = [
  { name: "numberProcess", label: "Número do Processo", type: "text" },
  { name: "forumName", label: "Nome do Fórum", type: "text" },
  { name: "courtName", label: "Nome da Vara", type: "text" },
  { name: "courtNumber", label: "Número da Vara", type: "text" },
  { name: "author", label: "Autor", type: "text" },
  { name: "defendantName", label: "Réu", type: "text" },
  { name: "processStatus", label: "Situação Processual", type: "text" },
  { name: "status", label: "Situação de Status", type: "text" },
  { name: "pending", label: "Pendências", type: "text" },
  { name: "note", label: "Observação", type: "text" },
  { name: "processDate", label: "Data do Processo", type: "string" },
  { name: "partner", label: "Parceiro", type: "text" },
  { name: "department", label: "Departamento", type: "text" },
  {
    name: "processOutcome",
    label: "Resultado do Processo",
    type: "select",
    options: ["won", "lost", "undefined"],
  },
  { name: "value", label: "Valor", type: "number" },
  { name: "portion", label: "Parcela", type: "number" },
];

export const RegisterClients = () => {
  const [formData, setFormData] = useState<Process>({
    numberProcess: "",
    forumName: "",
    courtName: "",
    courtNumber: "",
    author: "",
    defendantName: "",
    processStatus: "",
    status: "",
    pending: "",
    note: "",
    processDate: "",
    partner: "",
    department: "",
    processOutcome: "undefined", // default value
    value: 0,
    portion: 1, // default value
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

  const handleSubmit = () => {
    console.log(formData);
    // Lógica para enviar os dados para o back-end ou outra operação
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
            <FormControl fullWidth margin="normal" key={field.name}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={formData[field.name as keyof Process]}
                onChange={handleSelectChange}
                name={field.name}
                label={field.label}
              >
                {field.options?.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option === "won"
                      ? "Ganhou"
                      : option === "lost"
                      ? "Perdeu"
                      : "Indefinido"}
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
          />
        );
      })}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Registrar
      </Button>
    </Box>
  );
};
