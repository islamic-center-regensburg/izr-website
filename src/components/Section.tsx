import { Box } from "@chakra-ui/react";
import useResponsiveBreakpoints from "../hooks/useResponsiveBreakpoints";
import { useEffect, useState } from "react";
interface props {
  bg: string;
  margin?: boolean;
  children: React.ReactNode;
}

function Section({ margin = true, bg, children }: props) {
  const { isMobile, isTablet } = useResponsiveBreakpoints();
  const [witdh, setWidth] = useState("1200px");
  useEffect(() => {
    if (isMobile) {
      setWidth("100vw");
    } else if (isTablet) {
      setWidth("680px");
    } else {
      setWidth("1200px");
    }
  }, [isMobile, isTablet]);
  return (
    <Box
      marginBottom={margin ? "55px" : "0px"}
      padding={"20px"}
      width={witdh}
      backgroundColor={bg}
      borderRadius={"10px"}
    >
      {children}
    </Box>
  );
}

export default Section;
