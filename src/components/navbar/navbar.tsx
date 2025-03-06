import { Box, Typography, Button } from "@mui/material";
import { navBarData } from "./navBar-utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconNavbarLogo from "../../assets/IconNavbarLogo.png";

export const NavBar = () => {
  const [hover, SetHover] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null); 
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundColor: "#ffffff",
        width: "15%",
        minHeight: "100%",
        flexDirection: "column",
        display: "flex", 
        alignItems: "center",
        paddingTop: 24, 
      }}
    >
      <img
        src={IconNavbarLogo}
        alt="Logo"
        style={{
          width: "25%", 
          height: "4%",
          paddingBottom: 24,
        }}
      />
      {navBarData.map((item, index) => (
        <Button
          key={item.path}
          style={{
            backgroundColor: active === index ? "#a4906f" : hover === index ? "#d8c7a9" : "#ffffff", 
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
          onClick={() => {
            navigate(item.path);
            setActive(index);  
          }}
        >
          {item.icon}
          <Typography
            marginLeft={2}
            gap={10}
            color="black"
            fontWeight={300}
            fontSize={20}
            fontFamily={"montserrat"}
          >
            {item.title}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};
