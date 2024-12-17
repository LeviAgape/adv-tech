import { NavBar } from './components/navbar/navbar';
import { Box } from '@mui/material';

export const App = () => {

  return (
    <Box
    style={{
      backgroundColor:'#f5f5f5',
      width: '100vw',  
      height: '100vh', 
    }}
    >
    <NavBar/>
    </Box>
  )
}

