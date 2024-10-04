import { Box } from "@mui/material";
import { IProposedItineraireContainerProps } from "../../interfaces/components/IProposedContainerCard";
import ItineraireCard from "../cards/ItineraireCard";
// import { useState } from "react";

export default function ProposedItineraireContainer({
  onCheckboxChange,
  //itineraires,
  distance,
  duration,
}: IProposedItineraireContainerProps) {
  // const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
  //   null
  // );

  // const handleCardCheckboxChange = (index: number, checked: boolean) => {
  //    setSelectedCardIndex(checked ? index : null); // Deselect other cards
  //   onCheckboxChange(checked);
  // };
  const handleCardCheckboxChange = (checked: boolean) => {
    onCheckboxChange(checked);
  };

  return (
    <Box
      sx={{
        height: { xs: "80%", md: "55%" },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { md: "space-between" },
        gap: { xs: "1rem", md: 0 },
      }}
    >
      {/* {itineraires.map((itineraire, index) => (
        <ItineraireCard
          key={index} // Use the index as the key, but ideally use a unique id if available
           onCheckboxChange={(checked: boolean) => handleCardCheckboxChange(index, checked)}
          distance={itineraire.distance}
          duration={itineraire.duration}
           checked={selectedCardIndex === index}
        />
      ))} */}
      <ItineraireCard
        onCheckboxChange={handleCardCheckboxChange}
        distance={distance}
        duration={duration}
      />
      {/* <ItineraireCard
        onCheckboxChange={handleCardCheckboxChange}
        distance={distance}
        duration={duration}
      /> */}
    </Box>
  );
}
