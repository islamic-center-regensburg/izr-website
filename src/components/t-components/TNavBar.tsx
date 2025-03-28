import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/IZRLOGOROUND.png";
function TNavBar() {
  return (
    <HStack
      height={"80px"}
      width={"680px"}
      justifyContent={"space-between"}
      marginTop={"55px"}
      borderBottom={"1px solid lightgray"}
      borderTop={"1px solid lightgray"}
    >
      <HStack gap={0}>
        <Image src={logo} height={"80px"} width={"80px"}></Image>
        <Text>Islamisches Zentrum Regensburg</Text>
      </HStack>
      <HStack marginRight={"30px"} gap={"20px"}>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "white", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#prayer")}
        >
          Gebetszeiten
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "white", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#events")}
        >
          Informationen
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "white", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#blog")}
        >
          Blog
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "white", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#contact")}
        >
          Kontakt
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "white", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#donate")}
        >
          Spenden
        </Text>
      </HStack>
    </HStack>
  );
}

export default TNavBar;
