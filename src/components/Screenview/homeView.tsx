import { Box} from "@mui/material";
import { NavBar } from "../navbar/navbar";
import { globalStyles } from "../globalStyles";
import { FilterProcessDashBoard } from "../dashboard/filterProcessDashboard";
import { GridProcessDashboard } from "../dashboard/gridProcessDashboard";
import { GridPetitionDashboard } from "../dashboard/gridPetitionDashboard";

export const HomeView = () => {
  return (
    <>
      {globalStyles}
      <Box
        style={{
          backgroundColor: "#f5f5f5",
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <NavBar />
        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >        
          <FilterProcessDashBoard/>
          <GridProcessDashboard/>
          <GridPetitionDashboard/>
        </Box>
        
      </Box>
    </>
  );
};
