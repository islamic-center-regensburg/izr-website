import { HStack, VStack, Image, Heading, Text } from "@chakra-ui/react";
import location from "../../assets/izr.png";
import { colors } from "../../theme";
import logo from "../../assets/IZRLOGOROUND.png";
import useFetchStatments from "../../hooks/useFetchStatments";
import Skeleton from "../Skeleton";

function TVisitUs() {
  const { data, error, loading } = useFetchStatments();
  if (error) return <Text>Server Error</Text>;

  if (loading) return <Skeleton />;
  return (
    <VStack
      backgroundColor={colors.primary}
      color={"white"}
      padding={"20px"}
      borderRadius={"10px"}
    >
      <VStack>
        <Heading width={"100%"} fontSize={"3xl"} fontWeight={"semibold"}>
          Besuchen Sie uns
        </Heading>
        <Heading width={"100%"} fontSize={"xl"} fontWeight={"semibold"}>
          Islamisches Zentrum Regensburg IZR
        </Heading>
        {data.map(
          (d) =>
            d.type === "about_us" && (
              <Text fontSize={"xs"} width={"100%"}>
                {d.content}
              </Text>
            )
        )}
      </VStack>
      <HStack
        alignItems={"end"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <VStack>
          <Heading
            marginTop={"30px"}
            width={"100%"}
            fontSize={"xl"}
            fontWeight={"semibold"}
          >
            Adresse
          </Heading>
          <Text width={"100%"}>Alte Straubinger Str. 33</Text>
          <Text width={"100%"}>93055 Regensburg</Text>
          <Text marginTop={"10px"} width={"100%"}>
            Buslinien : 10 30
          </Text>
          <Text width={"100%"}>Haltstelle : Zuckerfabrikstraße</Text>
          <Image src={logo} height={"150px"} width={"150px"}></Image>
        </VStack>
        <Image
          src={location}
          width={"392px"}
          height={"100%"}
          borderRadius={"10px"}
        ></Image>
      </HStack>
    </VStack>
  );
}

export default TVisitUs;
