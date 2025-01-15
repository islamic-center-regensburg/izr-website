import { Heading, VStack, Text, Image } from "@chakra-ui/react";
import useFetchEvents from "../../hooks/useFetchEvents";
import Skeleton from "../Skeleton";
import useResponsiveBreakpoints from "../../hooks/useResponsiveBreakpoints";

function DEvents() {
  const { events, error, loading } = useFetchEvents();
  const { isMobile } = useResponsiveBreakpoints();

  if (error) return <Text>Server Error</Text>;
  if (loading) return <Skeleton />;
  return (
    <VStack id="events">
      <Heading width={"100%"}>Veranstaltungen</Heading>
      {events?.map((event) => (
        <VStack marginBottom={events?.length > 1 ? "55px" : ""}>
          <Heading width={"100%"} fontSize={"2xl"}>
            {event.title}
          </Heading>
          <Text>{event.description}</Text>
          <Image
            borderRadius={"10px"}
            shadow={"0px 0px 10px 4px lightgrey"}
            marginTop={"20px"}
            src={isMobile ? event.flyer : event.flyerTV}
          />
        </VStack>
      ))}
    </VStack>
  );
}

export default DEvents;
