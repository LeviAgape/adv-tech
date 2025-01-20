import { Box,} from "@mui/material";
import { NavBar } from "../navbar/navbar";
import { RegisterProcess } from "../process/registerProcess";
import { globalStyles } from "../globalStyles";
import { RegisterPetition } from "../petition/registerPetition";

export const ProcessView = () => {
  return (
    <>
      {globalStyles}

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          minWidth: "100vw",
          minHeight: "100vh",
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
        
          <RegisterProcess />
          <RegisterPetition/>
        </Box>
      </Box>
    </>
  );
};
