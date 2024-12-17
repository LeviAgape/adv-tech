import { Typography } from "@mui/material"
import { Box } from "@mui/material"
import { Button} from "@mui/material"

export const DashBoard = () => {
  
    return (
      <Box>
        <Button
        style={{
            backgroundColor:"#ffffff",
            borderRadius:12,
            textTransform:'none'
        }}
        //Ver como deixar o botão inteiro minusculo sem o textTransform
        >
        <Typography>Dashboard</Typography>
        </Button>
      </Box>
    )
  }
  