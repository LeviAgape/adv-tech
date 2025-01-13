import { Box, Typography } from '@mui/material';
import { NavBar } from '../navbar/navbar';

export const HomeView = () => {

  return (
    <Box
    style={{
      backgroundColor:'#f5f5f5',
      width: '100vw',  
      height: '100vh',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
    }}
    >      
    <NavBar/>
    <Box
    style={{
      width:'100%',
      height: '100%',
      paddingLeft:25,
    }}
    >
    <Typography variant="h4"
    style={{color:'black', fontWeight:500, fontFamily:'montserrat'}}
    >Olá, Evelyn</Typography>

    </Box>
    </Box>
  )
}

