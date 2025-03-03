import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
} from "@chakra-ui/react";
import useFetchPrayerData from "../../hooks/useFetchPrayerTimes";
import Skeleton from "../Skeleton";

function DPrayerTimes() {
  const { data, error, loading } = useFetchPrayerData();
  if (error) return <Text>Server Error</Text>;
  if (loading) return <Skeleton />;
  return (
    <VStack id="prayer">
      <Heading width={"100%"}>Gebetszeiten</Heading>
      <Heading fontSize={"xs"}>{data.prayerTimes?.Datum}</Heading>
      <Heading fontSize={"xs"}>{data.prayerTimes?.Hijri}</Heading>
      <TableContainer width={"100%"}>
        <Table variant="simple">
          <TableCaption>Islamic Center of Regensburg ©</TableCaption>
          <Thead>
            <Tr>
              <Th>Gebet</Th>
              <Th>Adhan Aufruf</Th>
              <Th>Beten</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Fajr</Td>
              <Td fontWeight={"bold"} >{data.prayerTimes?.Fajr}</Td>
              <Td>
                {data.prayerSettings?.fajr
                  ? "nach " + data.prayerSettings?.fajr + " min"
                  : "nach Adhan"}
              </Td>
            </Tr>
            <Tr>
              <Td>Dhuhr</Td>
              <Td fontWeight={"bold"} >{data.prayerTimes?.Dhuhr}</Td>
              <Td>
                {data.prayerSettings?.dhuhr
                  ? "nach " + data.prayerSettings?.dhuhr + " min"
                  : "nach Adhan"}
              </Td>
            </Tr>
            <Tr>
              <Td>Asr</Td>
              <Td fontWeight={"bold"} >{data.prayerTimes?.Asr}</Td>
              <Td>
                {data.prayerSettings?.asr
                  ? "nach " + data.prayerSettings?.asr + " min"
                  : "nach Adhan"}
              </Td>
            </Tr>
            <Tr>
              <Td>Maghrib</Td>
              <Td fontWeight={"bold"} >{data.prayerTimes?.Maghrib}</Td>
              <Td>
                {data.prayerSettings?.maghrib
                  ? "nach " + data.prayerSettings?.maghrib + " min"
                  : "nach Adhan"}
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>Isha</Td>
              <Td fontWeight={"bold"} >{data.prayerTimes?.Isha}</Td>
              {!data.prayerTimes?.Tarawih && <Td>
                {data.prayerSettings?.isha
                  ? "nach " + data.prayerSettings?.isha + " min"
                  : "nach Adhan"}
              </Td>}
              {data.prayerTimes?.Tarawih && <Td>vor Tarawih
              </Td>}
            </Tr>
            <Tr>
              <Td>Jumaa</Td>
              <Td fontWeight={"bold"} >{data.prayerTimes?.Jumaa}</Td>
              <Td>
                {data.prayerSettings?.jumaa
                  ? "nach " + data.prayerSettings?.jumaa + " min"
                  : "nach Adhan"}
              </Td>
            </Tr>
            {data.prayerTimes?.Tarawih && <Tr>
              <Td>Tarawih</Td>
              <Td fontWeight={"bold"} >{data.prayerTimes?.Tarawih}</Td>
              <Td>
                direkt nach Isha
              </Td>
            </Tr>}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default DPrayerTimes;
