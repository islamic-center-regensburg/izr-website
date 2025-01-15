import { HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../assets/IZRLOGOROUND.png";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function MNavBar() {
  const [active, setActive] = useState(false);
  return (
    <VStack
      width={"100vw"}
      justifyContent={"space-between"}
      backgroundColor={"white"}
      color={"black"}
      shadow={"0px 0px 20px 4px #DFDFDF"}
      borderBottom={"1px solid lightgray"}
      fontSize={"md"}
    >
      {active && (
        <VStack marginTop={"20px"} gap={"10px"}>
          <Text
            cursor={"pointer"}
            transition={"ease 0.25s"}
            padding={"5px"}
            borderRadius={"10px"}
            onClick={() => (window.location.hash = "#prayer")}
          >
            Gebetszeiten
          </Text>
          <Text
            cursor={"pointer"}
            transition={"ease 0.25s"}
            padding={"5px"}
            borderRadius={"10px"}
            onClick={() => (window.location.hash = "#events")}
          >
            Veranstaltungen
          </Text>
          <Text
            cursor={"pointer"}
            transition={"ease 0.25s"}
            padding={"5px"}
            borderRadius={"10px"}
            onClick={() => (window.location.hash = "#blog")}
          >
            Blog
          </Text>
          <Text
            cursor={"pointer"}
            transition={"ease 0.25s"}
            padding={"5px"}
            borderRadius={"10px"}
            onClick={() => (window.location.hash = "#contact")}
          >
            Kontakt
          </Text>
          <Text
            cursor={"pointer"}
            transition={"ease 0.25s"}
            padding={"5px"}
            borderRadius={"10px"}
            onClick={() => (window.location.hash = "#donate")}
          >
            Spenden
          </Text>
        </VStack>
      )}
      <HStack width={"100%"} justifyContent={"space-between"}>
        <HStack>
          <Image src={logo} height={"80px"} width={"80px"}></Image>
          <Text>Islamisches Zentrum Regensburg</Text>
        </HStack>
        {!active && (
          <IconButton
            marginRight={"20px"}
            aria-label="Search database"
            icon={<HamburgerIcon />}
            onClick={() => setActive(true)}
          />
        )}
        {active && (
          <IconButton
            marginRight={"20px"}
            aria-label="Search database"
            icon={<CloseIcon />}
            onClick={() => setActive(false)}
          />
        )}
      </HStack>
    </VStack>
  );
}

export default MNavBar;
