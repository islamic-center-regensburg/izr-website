import { ChakraProvider, VStack } from "@chakra-ui/react";
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
import '@fontsource/tajawal/400.css'; // Regular weight
import '@fontsource/tajawal/500.css'; // Medium weight
import '@fontsource/tajawal/700.css'; // Bold weight

import { extendTheme } from "@chakra-ui/react";
import IZRApp from "./components/IZRApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";


const theme = extendTheme({
  fonts: {
    heading: `'Tajawal', sans-serif`, // Use Tajawal for headings
    body: `'Tajawal', sans-serif`,   // Use Tajawal for body text
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
                  <DStatement />
                </Section>
                <Section bg="white">
                  <VisitUs />
                </Section>
                <Section bg="white">
                  <DPrayerTimes />
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
                <Section bg="white">
                  <DSpenden />
                </Section>
                <Section bg="white">
                  <DKontakt />
                </Section>
              </VStack>
            }
          />
          <Route path="/privacy-policy" element={<VStack gap={0} width={"100vw"} fontSize={fontSize}> <NavBar /> <PrivacyPolicy /></VStack>} />
        </Routes>
        <DFooter />
      </Router>
    </ChakraProvider>
  );
}

export default App;
