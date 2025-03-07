import { Box, Typography, Button } from "@mui/material";
import { navBarData } from "./navBar-utils";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IconNavbarLogo from "../../assets/IconNavbarLogo.png";

export const NavBar = () => {
  const [hover, setHover] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentIndex = navBarData.findIndex((item) => item.path === location.pathname);
    setActive(currentIndex);
  }, [location.pathname]);

  return (
    <Box
      style={{
        backgroundColor: "#ffffff",
        width: "15%",
        minHeight: "100vh",
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
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        {navBarData.map((item, index) => (
          <Button
            key={item.path}
            style={{
              backgroundColor:
                active === index ? "#a4906f" : hover === index ? "#d8c7a9" : "#ffffff",
              borderRadius: 12,
              textTransform: "none",
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "10px 16px",
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              navigate(item.path);
              setActive(index);
            }}
          >
            <Box width={30} display="flex" justifyContent="center" paddingLeft={8}>
              {item.icon}
            </Box>
            <Typography
              color="black"
              fontWeight={300}
              fontSize={20}
              fontFamily="montserrat"
              marginLeft={2}
            >
              {item.title}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};
