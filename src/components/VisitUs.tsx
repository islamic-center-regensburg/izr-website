import DVisitUs from "./d-components/DVisitUs";
import useResponsiveBreakpoints from "../hooks/useResponsiveBreakpoints";
import TVisitUs from "./t-components/TVisitUs";
import MVisitUs from "./m-components/MVisitUs";

function VisitUs() {
  const { isTablet, isDesktop, isMobile } = useResponsiveBreakpoints();
  return (
    <>
      {isDesktop && <DVisitUs />}
      {isTablet && <TVisitUs />}
      {isMobile && <MVisitUs />}
    </>
  );
}

export default VisitUs;
