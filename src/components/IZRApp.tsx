
import { Heading, Image, VStack, Text, Link, Stack } from '@chakra-ui/react'
import izr_app from "../assets/IZR_app_werbung.png"
import google_play from "../assets/Google_Play_Store_badge.png"
import app_store from "../assets/Download_on_the_App_Store_Badge.png"
import useResponsiveBreakpoints from '../hooks/useResponsiveBreakpoints'
function IZRApp() {
    const { isMobile } = useResponsiveBreakpoints();
    return (
        <VStack justifyContent={"center"} alignItems={"center"} width={"100%"}>
            <Heading width={"100%"}><Text>IZR APP herunterladen !</Text></Heading>
            <Stack flexDir={isMobile ? "column" : "row"} alignItems={"center"} justifyContent={"center"} width={"100%"} gap={"20%"}>
                <Image src={izr_app} width={isMobile ? "50%" : "30%"} ></Image>
                <VStack marginY={10} width={isMobile ? "50%" : "30%"} justifyContent={"center"}>
                    <Link href="https://play.google.com/store/apps/details?id=com.aminbl.izrApp&pcampaignid=web_share" isExternal>
                        <Image src={google_play}></Image>
                    </Link>
                    <Link href="https://apps.apple.com/de/app/izr/id6470660577?l" isExternal>
                        <Image src={app_store}></Image>
                    </Link>
                </VStack>
            </Stack>
        </VStack>
    )
}

export default IZRApp