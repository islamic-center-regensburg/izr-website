import useResponsiveBreakpoints from "../hooks/useResponsiveBreakpoints";
import DNavBar from "./d-components/DNavBar";
import MNavBar from "./m-components/MNavBar";
import TNavBar from "./t-components/TNavBar";

function NavBar() {
  const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();
  return (
    <>
      {isDesktop && <DNavBar />}
      {isTablet && <TNavBar />}
      {isMobile && <MNavBar />}

    </>
  );
}

export default NavBar;
