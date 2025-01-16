import { Box } from "@mui/material"
import { ButtonNavBar } from "../buttonNavbar/buttonNavBar"
const noop = () => {};

export const ListClient = () => {
    return (
        <Box>
            <ButtonNavBar label="Clientes" onClick={noop}/>
        </Box>
    )
}