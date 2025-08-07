import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import DStatement from "./components/d-components/DStatement";
import Section from "./components/Section";
import { useState, useEffect } from "react";
import useResponsiveBreakpoints from "./hooks/useResponsiveBreakpoints";
import VisitUs from "./components/VisitUs";
import DPrayerTimes from "./components/d-components/DPrayerTimes";
import DEvents from "./components/d-components/DEvents";
import DKontakt from "./components/d-components/DKontakt";
import DBlog from "./components/d-components/DBlog";
import DSpenden from "./components/d-components/DSpenden";
import DFooter from "./components/d-components/DFooter";
import "@fontsource/tajawal/400.css"; // Regular weight
import "@fontsource/tajawal/500.css"; // Medium weight
import "@fontsource/tajawal/700.css"; // Bold weight

import "@fontsource/fira-sans"; // Defaults to weight 400
import "@fontsource/fira-sans/400.css"; // Specify weight
import "@fontsource/fira-sans/700.css"; // Specify weight
import "@fontsource/fira-sans/400-italic.css"; // Specify weight and style

import { extendTheme } from "@chakra-ui/react";
import IZRApp from "./components/IZRApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PrayerTimesTable from "./components/PrayerTimesTable";
import Hero from "./components/Hero";
import { colors } from "./theme";

const theme = extendTheme({
  fonts: {
    heading: `'Fira Sans', sans-serif`, // Use Tajawal for headings
    body: `'Fira Sans', sans-serif`, // Use Tajawal for body text
  },
});

function App() {
  const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();
  const [fontSize, setFontSize] = useState("xm");
  useEffect(() => {
    if (isMobile) {
      setFontSize("md");
    } else if (isTablet) {
      setFontSize("xs");
    } else if (isDesktop) {
      setFontSize("xm");
    }
  }, [isMobile, isTablet, isDesktop]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <VStack gap={0} width={"100vw"} fontSize={fontSize}>
                <NavBar />
                <Section margin={false} bg="white">
                  <Hero></Hero>
                </Section>
                <Section margin={false} bg="white">
                  <DStatement />
                </Section>
                {/* <Box display={"flex"} justifyContent={"center"} backgroundColor={colors.primary} width={'100%'}> */}
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  bgGradient={colors.gradient}
                  width={"100%"}
                >
                  <Section bg="transparent">
                    <VisitUs />
                  </Section>
                </Box>
                <Section bg="white">
                  <DPrayerTimes />
                </Section>
                <Section bg="transparent">
                  <PrayerTimesTable />
                </Section>
                <Section bg="white">
                  <IZRApp />
                </Section>
                <Section bg="white">
                  <DEvents />
                </Section>
                <Section bg="white">
                  <DBlog />
                </Section>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  bgGradient={[
                    "linear(to-tr, teal.300, yellow.400)",
                    // "linear(to-t, blue.200, teal.500)",
                    // "linear(to-b, orange.100, green.500)",
                  ]}
                  width={"100%"}
                >
                  <Section bg="transparent">
                    <DSpenden />
                  </Section>
                </Box>
                <Section bg="white">
                  <DKontakt />
                </Section>
              </VStack>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <VStack gap={0} width={"100vw"} fontSize={fontSize}>
                {" "}
                <NavBar /> <PrivacyPolicy />
              </VStack>
            }
          />
        </Routes>
        <DFooter />
      </Router>
    </ChakraProvider>
  );
}

export default App;
