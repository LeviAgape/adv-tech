import { Box, Typography } from "@mui/material";
import { NavBar } from "../navbar/navbar";
import { RegisterProcess } from "../process/registerProcess";
import { globalStyles } from "../globalStyles";

export const ProcessView = () => {
  return (
    <>
      {globalStyles}

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <NavBar />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            paddingLeft: 25,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "black", fontWeight: 500, fontFamily: "montserrat" }}
          >
            Novo processo
          </Typography>
          <RegisterProcess />
        </Box>
      </Box>
    </>
  );
};
