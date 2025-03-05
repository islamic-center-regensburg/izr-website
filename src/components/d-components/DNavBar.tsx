import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/IZRLOGOROUND.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DNavBar() {
  const navigate = useNavigate();

  // Smooth scroll to the section if the hash is set in the URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    if (window.location.pathname !== "/") {
      // If not on the home page, navigate to the home page first
      navigate("/");
      setTimeout(() => {
        const target = document.querySelector(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Short delay to allow the page to load
    } else {
      // If already on the home page, scroll directly
      const target = document.querySelector(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <HStack
      width={"1200px"}
      justifyContent={"center"}
      marginY={"55px"}
      color={"black"}
      borderBottom={"1px solid lightgray"}
      borderTop={"1px solid lightgray"}
    >
      <HStack cursor={"pointer"} onClick={() => navigate("/")} gap={0}>
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
          onClick={() => handleScrollToSection("#prayer")}
        >
          Gebetszeiten
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => handleScrollToSection("#events")}
        >
          Veranstaltungen
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => handleScrollToSection("#blog")}
        >
          Blog
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => handleScrollToSection("#contact")}
        >
          Kontakt
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => handleScrollToSection("#donate")}
        >
          Spenden
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ backgroundColor: "lightgrey", color: "black" }}
          transition={"ease 0.25s"}
          padding={"5px"}
          borderRadius={"10px"}
          onClick={() => navigate("/privacy-policy")}
        >
          Privacy Policy
        </Text>
      </HStack>
    </HStack>
  );
}

export default DNavBar;
