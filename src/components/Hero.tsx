import { Image } from "@chakra-ui/react";
function Hero() {
    return (
        <Image
            src="https://izr-cloud.online/media/gallery_images/hero.png"
            alt="Hero Image"
            objectFit="cover"
            borderRadius={"revert"}
            overflow="hidden"

        />
    );
}

export default Hero;
