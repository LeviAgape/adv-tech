import { Box, Button, Typography } from "@mui/material";
import { ButtonNavBar } from "../buttonNavbar/buttonNavBar";
import { useState } from "react";
const noop = () => {};
const openDashboard = () => {};

export const DashBoard = () => {
  const [hover, SetHover] = useState(true);
  return (
    <Box>
      <Button
        style={{
          backgroundColor: hover ? "#dbeafe" : "#ffffff",
          borderRadius: 12,
          textTransform: "none",
          width: "100%",
          justifyContent: "flex-start",
        }}
        onMouseEnter={() => SetHover(true)}
        onMouseLeave={() => SetHover(false)}
        onClick={noop}
      >
        <Typography>Dashboard</Typography>
      </Button>
    </Box>
  );
};
