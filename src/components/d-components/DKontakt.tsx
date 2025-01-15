import { VStack, Heading, HStack, Text } from "@chakra-ui/react";
import useFetchUsers from "../../hooks/useFetchUsers";
import Skeleton from "../Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DKontakt() {
  const roles = {
    staff: "Vorstand",
    manager: "Vertretung",
    admin_schulunterricht: "Schulunterricht",
    admin_frauen: "Frauen",
    admin_entwicklung: "Entwicklung",
    admin_familien_kinder: "Familien & Kinder",
    admin_bestattungen: "Islamische Bestattungen",
    admin_gebaudehalter: "Gebäudehalter",
    admin_hausverwaltung: "Hausverwaltung",
    admin_sport_jugend: "Sport & Jugend",
  };

  const { users, error, loading } = useFetchUsers();
  if (error) return <Text>Server Error</Text>;
  if (loading) return <Skeleton />;

  return (
    <VStack id="contact">
      <Heading width={"100%"}>Kontakt</Heading>
      <HStack
        scrollBehavior={"smooth"}
        padding={"20px"}
        overflow={"scroll"}
        overflowY="hidden"
        maxW={"100%"}
        borderRight={"1px solid lightgray"}
        borderLeft={"1px solid lightgray"}
      >
        {users?.map((user) => (
          <VStack
            minW={"300px"}
            minH={"500px"}
            backgroundColor={"white"}
            color={"black"}
            padding={"20px"}
            borderRadius={"10px"}
            shadow={"0px 0px 10px 2px lightgrey"}
            justifyContent={"center"}
          >
            {user.roles.map((role) => (
              <Heading fontSize={"xl"}>
                {roles[role.role as keyof typeof roles]}
              </Heading>
            ))}

            <Heading width={"100%"} marginTop={30} fontSize={"l"}>
              {user.name + " " + user.last_name}
            </Heading>
            <Text width={"100%"} fontWeight={"semibold"}>
              Email
            </Text>
            {user.emails.map((email) => (
              <Text fontStyle={"italic"} width={"100%"}>
                {email.email}
              </Text>
            ))}
            <Text width={"100%"} fontWeight={"semibold"}>
              Tel
            </Text>
            {user.phone_numbers.map((number) => (
              <Text fontStyle={"italic"} width={"100%"}>
                {number.phone_number}
              </Text>
            ))}
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}

export default DKontakt;
