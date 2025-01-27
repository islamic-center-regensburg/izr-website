
import { Heading, Image, VStack, Text, Icon, Link, Stack } from '@chakra-ui/react'
import izr_app from "../assets/IZR_app_werbung.png"
import { FaAndroid, FaApple } from 'react-icons/fa'
import { colors } from '../theme'
import useResponsiveBreakpoints from '../hooks/useResponsiveBreakpoints'
function IZRApp() {
    const { isMobile } = useResponsiveBreakpoints();
    return (
        <VStack justifyContent={"center"} alignItems={"center"} width={"100%"}>
            <Heading width={"100%"}><Text>IZR APP herunterladen !</Text></Heading>
            <Stack flexDir={isMobile ? "column" : "row"} alignItems={"center"} justifyContent={"center"} width={"100%"} gap={"20%"}>
                <Image src={izr_app} width={isMobile ? "50%":"30%"} ></Image>
                <Stack justifyContent={"center"} flexDir={isMobile ? "row" : "column"}>
                        <Link href="https://play.google.com/store/apps/details?id=com.aminbl.izrApp&pcampaignid=web_share" isExternal>
                            <Icon as={FaAndroid} boxSize={20} color={colors.primary} _hover={{ opacity: 0.8 }} />
                        </Link>
                        <Link href="https://apps.apple.com/de/app/izr/id6470660577?l" isExternal>
                            <Icon as={FaApple} boxSize={20} color={colors.primary} _hover={{ opacity: 0.8 }} />
                        </Link>
                </Stack>
            </Stack>
        </VStack>
    )
}

export default IZRApp