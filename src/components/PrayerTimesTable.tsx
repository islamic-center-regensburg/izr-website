import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Alert,
    AlertIcon,
    Container,
    VStack,
    Heading,
    Stack,
    useBreakpointValue,
    HStack,
    Radio,
    RadioGroup,
    Select,
} from "@chakra-ui/react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}


interface PrayerTimesData {
    [date: string]: {
        Datum: string;
        Hijri: string;
        Fajr: string;
        Shuruq: string;
        Dhuhr: string;
        Asr: string;
        Maghrib: string;
        Isha: string;
    };
}

const PrayerTimesTable: React.FC = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [calendarType, setCalendarType] = useState("gregorian");
    const [periodType, setPeriodType] = useState("annual");
    const [year, setYear] = useState(2025);
    const [month, setMonth] = useState("1");

    const gregorianMonths = [
        "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    const hijriMonths = [
        "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhul-Qa'dah", "Dhul-Hijjah"
    ];


    const fetchPrayerTimes = async () => {
        setLoading(true);
        setError(null);
        try {
            const formData = {
                hijri: calendarType !== "gregorian",
                value: periodType === "anual" ? year : month,
                period: periodType
            }
            const response = await axios.post<PrayerTimesData>("https://izr-cloud.online/prayer-times", formData);
            setPrayerTimes(response.data);
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
        }
        setLoading(false);
    };

    const downloadPDF = (prayerTimes: PrayerTimesData) => {
        const doc = new jsPDF();
        const columns = ["Datum", "Hijri", "Fajr", "Shuruq", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const rows = Object.keys(prayerTimes).map((date) => [
            prayerTimes[date].Datum,
            prayerTimes[date].Hijri,
            prayerTimes[date].Fajr,
            prayerTimes[date].Shuruq,
            prayerTimes[date].Dhuhr,
            prayerTimes[date].Asr,
            prayerTimes[date].Maghrib,
            prayerTimes[date].Isha,
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });
        doc.save("prayer_times.pdf");
    };

    const downloadCSV = (prayerTimes: PrayerTimesData) => {
        const headers = ["Datum", "Hijri", "Fajr", "Shuruq", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const rows = Object.keys(prayerTimes).map((date) => [
            prayerTimes[date].Datum,
            prayerTimes[date].Hijri,
            prayerTimes[date].Fajr,
            prayerTimes[date].Shuruq,
            prayerTimes[date].Dhuhr,
            prayerTimes[date].Asr,
            prayerTimes[date].Maghrib,
            prayerTimes[date].Isha,
        ]);
        const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "prayer_times.csv";
        link.click();
    };

    return (
        <VStack width={!isMobile ? "100%" : "90%"}>
            <Heading width="100%">Gebetszeiten Berechnen</Heading>
            <Container overflow="scroll" borderRadius={10} maxW="container.xl" width="100%" py={6}>
                <Stack flexDirection={isMobile ? "column" : "row"} marginBottom={10}>
                    <RadioGroup onChange={setCalendarType} value={calendarType}>
                        <HStack spacing={4}>
                            <Radio value="gregorian">Gregorianisch</Radio>
                            <Radio value="hijri">Hijri</Radio>
                        </HStack>
                    </RadioGroup>

                    <RadioGroup onChange={setPeriodType} value={periodType}>
                        <HStack spacing={4}>
                            <Radio value="annual">Jährlich</Radio>
                            <Radio value="monthly">Monatlich</Radio>
                        </HStack>
                    </RadioGroup>


                </Stack>
                {periodType === "annual" && (
                    <FormControl>
                        <FormLabel>{calendarType === "hijri" ? "Hijri Jahr eingeben" : "Gregorianisches Jahr eingeben"}</FormLabel>
                        <Input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
                    </FormControl>
                )}
                {periodType === "monthly" && (
                    <FormControl>
                        <FormLabel>{calendarType === "hijri" ? "Hijri Monate" : "Gregorianische Monate"}</FormLabel>
                        <Select value={month} onChange={(e) => { setMonth(e.target.value) }}>
                            {(calendarType === "hijri" ? hijriMonths : gregorianMonths).map((m, index) => (
                                <option key={index} value={index + 1}>{m}</option>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <Button marginX={2} mt={4} onClick={fetchPrayerTimes}>
                    Berechnen
                </Button>
                <Button marginX={2} mt={4} onClick={() => prayerTimes && downloadPDF(prayerTimes)}>
                    PDF Herunterladen
                </Button>
                <Button marginX={2} mt={4} onClick={() => prayerTimes && downloadCSV(prayerTimes)}>
                    CSV Herunterladen
                </Button>

                {loading && <Spinner mt={4} />}
                {error && (
                    <Alert status="error" mt={4}>
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {prayerTimes && (
                    <Box mt={6}>
                        {isMobile ? (
                            <VStack maxH={"200vh"} spacing={4} align="stretch">
                                {Object.keys(prayerTimes).map((date) => (
                                    <Box key={date} p={4} borderWidth={1} borderRadius={8} >
                                        <Heading size="sm">{prayerTimes[date].Datum}</Heading>
                                        <VStack align="start" mt={2}>
                                            <Box><strong>Hijri:</strong> {prayerTimes[date].Hijri}</Box>
                                            <Box><strong>Fajr:</strong> {prayerTimes[date].Fajr}</Box>
                                            <Box><strong>Shuruq:</strong> {prayerTimes[date].Shuruq}</Box>
                                            <Box><strong>Dhuhr:</strong> {prayerTimes[date].Dhuhr}</Box>
                                            <Box><strong>Asr:</strong> {prayerTimes[date].Asr}</Box>
                                            <Box><strong>Maghrib:</strong> {prayerTimes[date].Maghrib}</Box>
                                            <Box><strong>Isha:</strong> {prayerTimes[date].Isha}</Box>
                                        </VStack>
                                    </Box>
                                ))}
                            </VStack>
                        ) : (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Datum</Th>
                                        <Th>Hijri</Th>
                                        <Th>Fajr</Th>
                                        <Th>Shuruq</Th>
                                        <Th>Dhuhr</Th>
                                        <Th>Asr</Th>
                                        <Th>Maghrib</Th>
                                        <Th>Isha</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {Object.keys(prayerTimes).map((date) => (
                                        <Tr key={date}>
                                            <Td>{prayerTimes[date].Datum}</Td>
                                            <Td>{prayerTimes[date].Hijri}</Td>
                                            <Td>{prayerTimes[date].Fajr}</Td>
                                            <Td>{prayerTimes[date].Shuruq}</Td>
                                            <Td>{prayerTimes[date].Dhuhr}</Td>
                                            <Td>{prayerTimes[date].Asr}</Td>
                                            <Td>{prayerTimes[date].Maghrib}</Td>
                                            <Td>{prayerTimes[date].Isha}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                    </Box>
                )}
            </Container>
        </VStack>
    );
};

export default PrayerTimesTable;