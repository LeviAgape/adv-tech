import { Box, Typography } from "@mui/material";
import { navBarData } from "./navBar-utils";
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
        width: "10%",
        height: "100%",
        flexDirection: "column",
        display: "flex", 
        alignItems: "center",
        paddingTop: 24, 
      }}
    >
      {navBarData.map((item, index) => (
        <Button
          key={item.path}
          style={{
            backgroundColor: hover === index ? "#a4906f" : "#ffffff",
            borderRadius: 12,
            textTransform: "none",
            width: "100%",
            justifyContent: "center", 
            alignItems: "center", 
            display: "flex",
            padding: "10px 0", 
          }}
          onMouseEnter={() => SetHover(index)}
          onMouseLeave={() => SetHover(null)}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <Typography
            marginLeft={2}
            gap={10}
            color="black"
            fontWeight={300}
            fontSize={30}
            fontFamily={"montserrat"}
          >
            {item.title}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};
