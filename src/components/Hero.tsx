import { Image } from "@chakra-ui/react";
import useResponsiveBreakpoints from "../hooks/useResponsiveBreakpoints";
function Hero() {
    const { isMobile } = useResponsiveBreakpoints();
    return (
        <Image
            src="https://izr-cloud.online/media/gallery_images/hero.png"
            alt="Hero Image"
            objectFit="cover"
            marginTop={isMobile ? 0 : -55}
        />
    );
}

export default Hero;
