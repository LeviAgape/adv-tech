import { Box} from "@mui/material";
import { NavBar } from "../navbar/navbar";
import { globalStyles } from "../globalStyles";
import IconLogo from "../../assets/IconLogo.png";
import { FilterProcessDashBoard } from "../dashboard/filterProcessDashboard";

export const HomeView = () => {
  return (
    <>
      {globalStyles}
      <Box
        style={{
          backgroundColor: "#f5f5f5",
          width: "100vw",
          height: "100vh",
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
          <img
            src={IconLogo}
            alt="Logo"
            style={{
              width: "20%", 
              height: "24%",
            }}
          />
         
          <FilterProcessDashBoard/>
        </Box>
      </Box>
    </>
  );
};
