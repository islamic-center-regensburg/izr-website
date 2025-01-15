import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/IZRLOGOROUND.png";

function DNavBar() {
  return (
    <HStack
      width={"1200px"}
      justifyContent={"center"}
      marginY={"55px"}
      color={"black"}
      borderBottom={"1px solid lightgray"}
      borderTop={"1px solid lightgray"}
    >
      <HStack gap={0}>
        <Image src={logo} height={"100px"} width={"100px"}></Image>
        <Text>Islamisches Zentrum Regensburg</Text>
      </HStack>
      <HStack marginLeft={"180px"} gap={"20px"}>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#prayer")}
        >
          Gebetszeiten
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#events")}
        >
          Veranstaltungen
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#blog")}
        >
          Blog
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => (window.location.hash = "#contact")}
        >
          Kontakt
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
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

export default DNavBar;
