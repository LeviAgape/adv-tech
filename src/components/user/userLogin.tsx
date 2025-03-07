import { Box, TextField, Button, Typography } from "@mui/material";
import { globalStyles } from "../globalStyles";
import SimbolLawyerUserLogin from "../../assets/SimbolLawyerUserLogin.png";
import IconLogoAdvTech from "../../assets/IconLogoAdvTech v1.png";
import { useState } from "react";
import axios from "axios";
import { UserLoginValidation } from "./interfaceUser";

export const UserLogin = () => {
  const [user, setUser] = useState<UserLoginValidation>({
    name: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      const response = await axios.get<UserLoginValidation>(
        `http://localhost:8000/user/${user.name}`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.password === user.password) {
        window.location.href = "/dashboard";
      } else {
        setError("Nome de usuário ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        padding: 0,
      }}
    >
      {globalStyles}
      <Box
        component="img"
        src={SimbolLawyerUserLogin}
        sx={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          alignSelf: "start",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <img src={IconLogoAdvTech} width={"34%"} />
        <Box sx={{ paddingTop: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            <span style={{ fontStyle: "italic", color: "#555" }}>
              Sua organização judicial
            </span>
          </Typography>
        </Box>

        {/* Formulário para capturar Enter */}
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Login"
            name="name"
            variant="outlined"
            placeholder="Nome de usuário"
            value={user.name}
            onChange={handleChange}
            sx={{
              width: "300px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: 2,
            }}
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            variant="outlined"
            placeholder="Senha"
            value={user.password}
            onChange={handleChange}
            sx={{
              width: "300px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: 2,
            }}
          />

          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "200px",
              backgroundColor: "#5a3e1b",
              "&:hover": { backgroundColor: "#4e3516" },
              borderRadius: 4,
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};
