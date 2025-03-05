import { Heading, VStack, Text, Image, Button, Stack, Link } from "@chakra-ui/react";
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
          <Stack flexDir={isMobile ? "column" : "row"} justifyContent={"left"} width={"100%"}>
            <Heading width={"100%"} fontSize={"3xl"}>
              {event.title}
            </Heading>
            {event.more_info && <Link href={event.more_info} isExternal>
              <Button width={"100%"}>
                Mehr Informationen / Link Zum Anmedlden
              </Button>
            </Link>}
          </Stack>
          <Image
            borderRadius={"10px"}
            shadow={"0px 0px 10px 4px lightgrey"}
            marginTop={"20px"}
            src={isMobile ? event.flyer : event.flyerTV}
          />
          {/* <Text width={"100%"}>{formatText(event.description)}</Text> */}
        </VStack>
      ))}
    </VStack>
  );
}

export default DEvents;
