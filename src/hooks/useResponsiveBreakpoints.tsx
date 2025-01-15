import { useMediaQuery } from "@chakra-ui/react";

const useResponsiveBreakpoints = () => {
  const [isMobile] = useMediaQuery("(max-width: 744px)");
  const [isTablet] = useMediaQuery(
    "(min-width: 744px) and (max-width: 1250px)"
  );
  const [isDesktop] = useMediaQuery("(min-width: 1250px)");

  return { isMobile, isTablet, isDesktop };
};

export default useResponsiveBreakpoints;
