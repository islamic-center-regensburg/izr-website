import { VStack, Text, HStack, Icon, Link } from "@chakra-ui/react";
import { FaInstagram, FaFacebookF, FaAndroid, FaApple } from "react-icons/fa";
import { colors } from "../../theme";

function DFooter() {
  return (
    <VStack
      height={"300px"}
      backgroundColor={colors.primary}
      color={"white"}
      justifyContent={"center"}
      spacing={4}
    >
      <HStack spacing={5}>
        <Link href="https://www.instagram.com/islamischeszentrumregensburg_?igsh=MXhmNTF6MGlnM3VnMg==" isExternal>
          <Icon as={FaInstagram} boxSize={6} color="white" _hover={{ opacity: 0.8 }} />
        </Link>
        <Link href="https://www.facebook.com/share/1DmqrYKBGg/?mibextid=wwXIfr" isExternal>
          <Icon as={FaFacebookF} boxSize={6} color="white" _hover={{ opacity: 0.8 }} />
        </Link>
        <Link href="https://play.google.com/store/apps/details?id=com.aminbl.izrApp&pcampaignid=web_share" isExternal>
          <Icon as={FaAndroid} boxSize={6} color="white" _hover={{ opacity: 0.8 }} />
        </Link>
        <Link href="https://apps.apple.com/de/app/izr/id6470660577?l" isExternal>
          <Icon as={FaApple} boxSize={6} color="white" _hover={{ opacity: 0.8 }} />
        </Link>
      </HStack>
      <Text lineHeight={"3"} >Islamisches Zentrum Regensburg ©</Text>
      <Text lineHeight={"3"} >Developed by</Text>
      <Text lineHeight={"3"} >medaminbl</Text>
    </VStack>
  );
}

export default DFooter;
