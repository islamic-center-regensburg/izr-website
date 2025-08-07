import { HStack, VStack, Image, Heading, Text } from "@chakra-ui/react";
import location from "../../assets/izr.png";
import logo from "../../assets/IZRLOGOROUND.png";
import useFetchStatments from "../../hooks/useFetchStatments";
import Skeleton from "../Skeleton";

function DVisitUs() {
  const { data, error, loading } = useFetchStatments();
  if (error) return <Text>Server Error</Text>;

  if (loading) return <Skeleton />;
  return (
    <HStack
      color={"white"}
      padding={"20px"}
      borderRadius={"10px"}
      alignItems={"end"}
      justifyContent={"space-between"}
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
              <Text textAlign={"justify"} fontSize={"s"} width={"100%"}>
                {d.content}
              </Text>
            )
        )}

        <HStack width={"100%"}>
          
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
          <Image src={logo} height={"200px"} width={"200px"}></Image>
        </HStack>
      </VStack>
      <Image
        src={location}
        width={"392px"}
        height={"100%"}
        borderRadius={"10px"}
      ></Image>
    </HStack>
  );
}

export default DVisitUs;
