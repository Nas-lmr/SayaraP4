import { Container } from "@mui/material";
import FormTrip from "../../components/FormTrip";


export default function NewJourneyPage() {
  return (
    <Container
    disableGutters
    sx={{
      height: "100vh",
      pt: "4rem",
      pb: "3.5rem",
      backgroundColor: "#F4F4F4",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      
    }}
  >
  <FormTrip/>
  </Container>
  )
}
