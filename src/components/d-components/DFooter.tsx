import { VStack, Text } from "@chakra-ui/react";
import { colors } from "../../theme";

function DFooter() {
  return (
    <VStack
      height={"100px"}
      borderRadius={"10px"}
      backgroundColor={colors.primary}
      color={"white"}
      justifyContent={"center"}
    >
      <Text>Islamisches Zentrum Regensburg ©</Text>
      <Text>Designed By MAB</Text>
    </VStack>
  );
}

export default DFooter;
