import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function Skeleton() {
  return (
    <Box width={"100%"} height={"100%"} padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
}

export default Skeleton;
