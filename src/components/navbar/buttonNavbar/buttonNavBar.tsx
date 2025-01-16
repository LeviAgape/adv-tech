import { Button } from "@mui/material"
import {Box, Typography} from "@mui/material"
import {useState} from "react";



export const ButtonNavBar = ({label, onClick}: {label:string, onClick:() => void}) => {
      const [hover, SetHover] = useState(false);
    return (
        <Box>
        <Button
        
        style={{
            backgroundColor: hover ? "#dbeafe" : "#ffffff",
            borderRadius:12,
            textTransform:'none',
            width:'100%',
            justifyContent:"flex-start"
        }}
        onMouseEnter={() => SetHover(true)}
        onMouseLeave={() => SetHover(false)}
        onClick={onClick}
        >
        <Typography>{label}</Typography>
        </Button>
        </Box>
    )
}