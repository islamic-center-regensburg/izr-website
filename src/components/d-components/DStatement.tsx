import { Heading, VStack, Text } from "@chakra-ui/react";
import useFetchStatments from "../../hooks/useFetchStatments";
import Skeleton from "../Skeleton";
import { useEffect } from "react";

function DStatement() {
  const { data, error, loading } = useFetchStatments();

  useEffect(() => {
    console.log(data.length);
  });
  if (error) return <Text>Server Error</Text>;

  if (loading) return <Skeleton />;
  return (
    <>
      {data.length == 2 && data[0].type !== "about_us" && (
        <VStack marginBottom={"55px"}>
          <Heading width={"100%"} fontWeight={"semibold"} fontSize={"3xl"}>
            Stellungnahme
          </Heading>
          <Heading width={"100%"} fontWeight={"semibold"} fontSize={"xl"}>
            {data[0].title}
          </Heading>
          <Text textAlign={"justify"}>{data[0].content}</Text>
        </VStack>
      )}
    </>
  );
}

export default DStatement;
