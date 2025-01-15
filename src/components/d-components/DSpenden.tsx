import {
  Heading,
  VStack,
  Text,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

function DSpenden() {
  return (
    <VStack spacing={4} align="start" width="100%" id="donate">
      <Heading width="100%">Spenden</Heading>
      <Text>
        Das Islamische Zentrum Regensburg ist ein gemeinnütziger Verein, der
        sich ausschließlich aus Spenden und Mitgliedsbeiträgen finanziert. Ihre
        Unterstützung ermöglicht es uns, unsere vielfältigen Projekte zur
        Förderung der islamischen Religion, Kultur und Integration
        weiterzuführen und auszubauen. Jeder Beitrag, ob groß oder klein, hilft
        uns, unsere Arbeit fortzusetzen und positive Impulse in unserer
        Gemeinschaft zu setzen.
      </Text>
      <Heading my={5} width="100%" fontSize="xl">
        So können Sie uns unterstützen:
      </Heading>
      <UnorderedList spacing={2} pl={5}>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Einmalige Spenden:
          </Text>{" "}
          Jede Spende, egal in welcher Höhe, leistet einen wertvollen Beitrag zu
          unserer Arbeit.
        </ListItem>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Mitglied werden:
          </Text>{" "}
          Werden Sie Teil unserer Gemeinschaft und unterstützen Sie uns
          regelmäßig mit einem Mitgliedsbeitrag.
        </ListItem>
      </UnorderedList>
      <Text as="span" fontWeight="bold">
        Spendenkonto:
      </Text>
      <Text>
        Empfänger :{" "}
        <Heading fontSize="xl">Islamisches Zentrum Regensburg</Heading>
      </Text>
      <Text>
        IBAN : <Heading fontSize="xl">DE30 7505 0000 0026 7651 56</Heading>
      </Text>
      <Text>
        BIC : <Heading fontSize="xl">BYLADEM1RGB</Heading>
      </Text>
    </VStack>
  );
}

export default DSpenden;
