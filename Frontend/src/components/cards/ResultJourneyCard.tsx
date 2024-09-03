import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Divider,
  Typography,
} from "@mui/material";

export default function ResultJourneyCard() {
  return (
    <Card sx={{ height: "13vh", width: "90%" }}>
      <CardActionArea sx={{ height: "70%", width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography
            textAlign="center"
            sx={{
              fontSize: "0.8rem",
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            09h00
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              fontSize: "0.6rem",
              fontFamily: "Montserrat",
              color: "#7E7E7E",
              fontWeight: 500,
              pl: "0.5rem",
            }}
          >
            <QueryBuilderRoundedIcon
              sx={{
                color: "#7E7E7E",
                fontSize: "0.6rem",
                fontFamily: "Montserrat",
                fontWeight: 600,
              }}
            />{" "}
            4h45
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              fontSize: "0.8rem",
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            13h45
          </Typography>
        </Box>
        <Box
          sx={{
            width: "7%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TripOriginRoundedIcon
            sx={{
              fontSize: "0.8rem",
              color: "#321F47",
            }}
          />
          <Box
            sx={{
              height: "50%",
              width: 5,
              backgroundColor: "#321F47",
              borderRadius: "0.5rem",
            }}
          />
          <TripOriginRoundedIcon
            sx={{
              fontSize: "0.8rem",
              color: "#321F47",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "60%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography
              sx={{
                height: "50%",
                fontSize: "0.8rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              Paris
              {/* <Box
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    width: "50%",
                    height: "60%",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: "33%",
                      backgroundColor: "#6AE35F",
                      borderRadius: "100%",
                    }}
                  >
                    <PersonRoundedIcon
                      sx={{
                        fontSize: "0.6rem",
                        color: "#321F47",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      height: "100%",
                      width: "33%",
                      backgroundColor: "#6AE35F",
                      borderRadius: "100%",
                    }}
                  >
                    <PersonRoundedIcon
                      sx={{
                        fontSize: "0.6rem",
                        color: "#321F47",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      height: "100%",
                      width: "33%",
                      backgroundColor: "#6AE35F",
                      borderRadius: "100%",
                    }}
                  >
                    <PersonRoundedIcon
                      sx={{
                        fontSize: "0.6rem",
                        color: "#321F47",
                      }}
                    />
                  </Box>
                </Box> */}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.8rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              Marseille
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            35
            <EuroRoundedIcon
              sx={{
                fontSize: "1rem",
                color: "#321F47",
              }}
            />
          </Typography>
        </Box>
      </CardActionArea>
      <Divider />
      <Box
        sx={{
          pl: "0.5rem",
          pr: "0.5rem",
          height: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            width: "70%",
            fontSize: "0.9rem",
            fontFamily: "Montserrat",
            color: "#321F47",
            fontWeight: 500,
          }}
        >
          Aristide
        </Typography>
        <Button
          endIcon={<KeyboardArrowRightRoundedIcon />}
          sx={{
            width: "40%",
            height: "100%",
            p: 0,
            fontSize: "0.9rem",
            fontFamily: "Montserrat",
            color: "#321F47",
            textTransform: "none",
            fontWeight: 400,
          }}
        >
          Voir profil
        </Button>
      </Box>
    </Card>
  );
}
