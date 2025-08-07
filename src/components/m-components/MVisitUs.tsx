import { HStack, VStack, Image, Heading, Text } from "@chakra-ui/react";
import logo from "../../assets/IZRLOGOROUND.png";
import Skeleton from "../Skeleton";
import useFetchStatments from "../../hooks/useFetchStatments";

function MVisitUs() {
  const { data, error, loading } = useFetchStatments();
  if (error) return <Text>Server Error</Text>;

  if (loading) return <Skeleton />;
  return (
    <VStack color={"white"} padding={"20px"} borderRadius={"10px"}>
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
      <VStack alignItems={"start"} width={"100%"}>
        <HStack justifyContent={"start"}>
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
          </VStack>
          <Image src={logo} height={"120px"} width={"120px"}></Image>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default MVisitUs;
