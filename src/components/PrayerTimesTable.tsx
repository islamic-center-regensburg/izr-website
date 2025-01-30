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
} from "@chakra-ui/react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

interface DateInput {
    d: number;
    m: number;
    y: number;
}

interface PrayerTimesData {
    [date: string]: {
        Datum: string;
        Hijri: string;
        Fajr: string;
        Dhuhr: string;
        Asr: string;
        Maghrib: string;
        Isha: string;
    };
}

const PrayerTimesTable: React.FC = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [formData, setFormData] = useState<{
        city_name: string;
        start_date: DateInput;
        end_date: DateInput;
        lat: number;
        lng: number;
        method: number;
    }>({
        city_name: "Regensburg",
        start_date: { d: 1, m: 1, y: 2025 },
        end_date: { d: 31, m: 12, y: 2025 },
        lat: 49.007734,
        lng: 12.102841,
        method: 10,
    });

    const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.includes("start_date") || name.includes("end_date")) {
            const [field, key] = name.split(".");
            if (field === "start_date" || field === "end_date") {
                setFormData((prev) => ({
                    ...prev,
                    [field]: { ...prev[field], [key as keyof DateInput]: parseInt(value) },
                }));
            }
        } else {
            setFormData({ ...formData, [name]: parseFloat(value) || value });
        }
    };

    const fetchPrayerTimes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<PrayerTimesData>("https://izr-cloud.online/calculTimes/", formData);
            setPrayerTimes(response.data);
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
        }
        setLoading(false);
    };

    const downloadPDF = (prayerTimes: PrayerTimesData) => {
        const doc = new jsPDF();
        const columns = ["Datum", "Hijri", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const rows = Object.keys(prayerTimes).map((date) => [
            prayerTimes[date].Datum,
            prayerTimes[date].Hijri,
            prayerTimes[date].Fajr,
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
        const headers = ["Datum", "Hijri", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const rows = Object.keys(prayerTimes).map((date) => [
            prayerTimes[date].Datum,
            prayerTimes[date].Hijri,
            prayerTimes[date].Fajr,
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
        <VStack width="100%">
            <Heading width="100%">Gebetszeiten Berechnen</Heading>
            <Container overflow="scroll" shadow="0px 0px 10px 1px lightgrey" borderRadius={10} maxW="container.xl" width="100%" py={6}>
                <Stack flexDir={isMobile ? "column" : "row"} alignItems="flex-start" justifyContent="start">
                    <FormControl>
                        <FormLabel>Startdatum</FormLabel>
                        <Input type="number" name="start_date.d" placeholder="Day" onChange={handleChange} defaultValue={1} />
                        <Input type="number" name="start_date.m" placeholder="Month" onChange={handleChange} defaultValue={1} />
                        <Input type="number" name="start_date.y" placeholder="Year" onChange={handleChange} defaultValue={2025} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Enddatum</FormLabel>
                        <Input type="number" name="end_date.d" placeholder="Day" onChange={handleChange} defaultValue={31} />
                        <Input type="number" name="end_date.m" placeholder="Month" onChange={handleChange} defaultValue={12} />
                        <Input type="number" name="end_date.y" placeholder="Year" onChange={handleChange} defaultValue={2025} />
                    </FormControl>
                </Stack>

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
                    <Box width="100%" mt={6}>
                        {isMobile ? (
                            <VStack maxH={"200vh"} spacing={4} align="stretch">
                                {Object.keys(prayerTimes).map((date) => (
                                    <Box key={date} p={4} borderWidth={1} borderRadius={8} >
                                        <Heading size="sm">{prayerTimes[date].Datum}</Heading>
                                        <VStack align="start" mt={2}>
                                            <Box><strong>Hijri:</strong> {prayerTimes[date].Hijri}</Box>
                                            <Box><strong>Fajr:</strong> {prayerTimes[date].Fajr}</Box>
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