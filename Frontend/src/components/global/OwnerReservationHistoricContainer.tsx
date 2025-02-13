import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImgReservation from "../../assets/images/ReservationImg.png";
import { useUserContext } from "../../context/UserContext";
import { Reservation } from "../../interfaces/components/IHistoric";
import {
  capitalizeFirstLetter,
  formatDateDisplay,
} from "../../services/common/ConversionValue";
import { fetchOwnerTripReservationHistoric } from "../../services/user/OwnerTrip";
import ReturnPreviousBtn from "../buttons/ReturnPreviousBtn";
import OwnerReservationHistoricCard from "../cards/OwnerReservationHistoricCard";

export default function OwnerReservationHistoricContainer() {
  const [reservations, setReservations] = useState<Reservation[]>([]); 
  const { userData } = useUserContext();


  const id = userData?.user?.id;
  const tripId = useParams();

  useEffect(() => {
    if (id && tripId) {
      fetchOwnerTripReservationHistoric(id, tripId.id)
        .then((response) => {
          if (response.success) setReservations(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id, tripId]);

  const departureDate = new Date(reservations[0]?.trip.departureDateTime);

  return (
    <Box
      sx={{
        height: { xs: "90vh", sm: "87vh", md: "100vh" },
        width: "100%",
        pt: { xs: "1rem", md: 0 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        pb: { xs: "2rem", md: 0 },
        "&::-webkitScrollbar": {
          display: "none",
        },
        "MsOverflowStyle": "none",
        "scrollbarWidth": "none",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "spaceAround" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "spaceBetween",
            alignItems: "center",
            width: { md: "55%" },
            height: { md: "60%", lg: "75%" },
            pt: { md: "1rem" },
          }}
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReturnPreviousBtn />
            <Typography
              textAlign="center"
              variant="h1"
              sx={{
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.8rem" },
                fontWeight: 500,
                fontFamily: "Montserrat",
                ml: { xs: "1rem" },
              }}
            >
              Réservations du trajet
            </Typography>
          </Box>
          <Box
            component="img"
            src={ImgReservation}
            sx={{
              width: { xs: "16rem", sm: "16rem", md: "24rem", lg: "28rem" },
              height: { md: "60%", lg: "75%" },
              mt: "1rem",
            }}
          />
        </Box>

        {reservations.length > 0 ? (
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              height: { xs: "70%", md: "100%" },
              display: "flex",
              justifyContent: { md: "spaceBetween" },
              alignItems: { sm: "center" },
              flexDirection: "column",
              backgroundColor: "white",
              pt: { md: "1rem" },
            }}
          >
            <Box
              sx={{
                height: { xs: "20%", sm: "25%", md: "10%" },
                width: "100%",
              }}
            >
              <Typography
                textAlign="start"
                sx={{
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem" },
                  width: { xs: "100%", md: "90%", lg: "80%" },
                  display: "flex",
                  mt: { xs: "1rem", md: "0.5rem" },
                  pl: "1rem",
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                Trajet:{" "}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "0.5rem",
                    fontWeight: 400,
                  }}
                >
                  {capitalizeFirstLetter(reservations[0]?.trip.departureCity)}
                  {<TrendingFlatRoundedIcon sx={{ fontSize: "2rem" }} />}{" "}
                  {capitalizeFirstLetter(reservations[0]?.trip.destinationCity)}
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem" },
                  width: { xs: "100%", md: "90%", lg: "80%" },
                  display: "flex",
                  mt: { xs: "1rem", md: "0.5rem" },
                  pl: "1rem",
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                Le :{" "}
                <span style={{ fontWeight: 400 }}>
                  {formatDateDisplay(departureDate)}
                </span>
              </Typography>
            </Box>
            <Box
              sx={{
                height: { xs: "70%", md: "80%" },
                width: { xs: "100%", sm: "80%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "1rem",
                pt: { xs: "1rem", md: 0 },
                mt: "3rem"
              }}
            >
              {reservations.map((reservation, index) => (
                <OwnerReservationHistoricCard
                  key={index}
                  reservation={reservation}
                  index={index + 1}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              height: { xs: "70%", md: "100%" },
              display: "flex",
              justifyContent: "center",
              alignItems: { sm: "center" },
              backgroundColor: "white",
            }}
          >
            <Typography
              textAlign="center"
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem" },
                width: { xs: "100%", md: "90%", lg: "80%" },
                mt: { xs: "1rem", md: "0.5rem" },
                pl: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              Tu n'as pas encore de réservations !
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
