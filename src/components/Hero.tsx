import { Box, Heading, Image, Text } from "@chakra-ui/react";
import izr from "../assets/izr1.png";
function Hero() {
  return (
    <Box position="relative" backgroundColor="black">
      <Image
        src={izr}
        opacity={0.3}
        alt="Hero Image"
        objectFit="cover"
        w="100%"
        h={{ base: "300px", md: "500px" }}
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        px={{ base: 4, md: 8 }}
        w={{ base: "90%", md: "70%" }}
        color="white"
      >
        <Heading fontSize={{ base: "lg", md: "2xl", lg: "3xl" }} mb={2}>
          Willkommen im Islamischen Zentrum Regensburg
        </Heading>
        <Heading fontSize={{ base: "md", md: "xl" }} mb={4}>
          Ein Ort der Begegnung, des Glaubens und des Miteinanders.
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Ob Sie auf der Suche nach spiritueller Vertiefung, Wissen oder
          Gemeinschaft sind – bei uns sind Sie herzlich willkommen. Entdecken
          Sie unsere Angebote, Veranstaltungen und das lebendige Miteinander im
          Herzen Regensburgs.
        </Text>
      </Box>
    </Box>
  );
}

export default Hero;
