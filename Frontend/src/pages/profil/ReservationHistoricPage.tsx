import {  Container } from "@mui/material";

import PassengerHistoricContainer from "../../components/global/PassengerHistoricContainer";
export default function ReservationHistoricPage()  {
  return (
  
       <Container
       disableGutters
       maxWidth={false}
       sx={{
         m: 0,
         height: "100vh",
         pt: "4rem",
         pb: "3rem",
         backgroundColor: "#F4F4F4",
         display: "flex",
         justifyContent: "center",
         overflow:"auto"
         
       }}
     >
    <PassengerHistoricContainer/>
    </Container>
  )
}

