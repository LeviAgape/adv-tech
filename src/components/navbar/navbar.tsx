import { Box, Typography } from "@mui/material";
import { navBarData } from "../../navBar/navBar-utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
export const NavBar = () => {
  const [hover, SetHover] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundColor: "#ffffff",
        width: "15%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {navBarData.map((item, index) => (
        <Button
          key={item.path}
          style={{
            backgroundColor: hover === index ? "#dbeafe" : "#ffffff",
            borderRadius: 12,
            textTransform: "none",
            width: "100%",
            justifyContent: "flex-start",
          }}
          onMouseEnter={() => SetHover(index)}
          onMouseLeave={() => SetHover(null)}
          onClick={() => navigate(item.path)}
        >
          <Typography>{item.title}</Typography>
        </Button>
      ))}
    </Box>
  );
};
