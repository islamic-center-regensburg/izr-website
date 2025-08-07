import {
  Heading,
  VStack,
  Text,
  Image,
  Button,
  Stack,
  Link,
  Box,
  Card,
  CardBody,
  CardHeader,
  IconButton,
} from "@chakra-ui/react";
import useFetchEvents from "../../hooks/useFetchEvents";
import Skeleton from "../Skeleton";
import useResponsiveBreakpoints from "../../hooks/useResponsiveBreakpoints";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function DEvents() {
  const { events, error, loading } = useFetchEvents();
  const { isMobile } = useResponsiveBreakpoints();

  if (error) return <Text>Server Error</Text>;
  if (loading) return <Skeleton />;

  return (
    <VStack id="events" spacing={8} width="100%">
      <Heading width="100%" textAlign="left">
        Informationen
      </Heading>
      {events?.map((event, index) => (
        <Card key={index} width="100%" shadow="lg" borderRadius="xl" p={4}>
          <CardHeader>
            <Heading size="lg">{event.title}</Heading>
          </CardHeader>
          <CardBody>
            <Stack
              display={"flex"}
              alignItems={"center"}
              direction={"column"}
              spacing={6}
            >
              {/* Left side: Description */}
              <Box width={"100%"} flex="1">
                <Text>{event.description}</Text>
                {event.more_info && (
                  <Link href={event.more_info} isExternal>
                    <Button mt={4} colorScheme="blue" width="fit-content">
                      Mehr Informationen / Link Zum Anmelden
                    </Button>
                  </Link>
                )}
              </Box>

              {/* Right side: Flyer slider with shadows */}
              <Box w={isMobile ? "100%" : "50%"} flex="1" position="relative">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={true}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: `.swiper-button-prev-${index}`,
                    nextEl: `.swiper-button-next-${index}`,
                  }}
                >
                  <SwiperSlide>
                    <Image
                      src={event.flyer}
                      borderRadius="md"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                      alt="Flyer"
                      objectFit="cover"
                      width="100%"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={event.flyer_en}
                      borderRadius="md"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                      alt="Flyer Englisch"
                      objectFit="cover"
                      width="100%"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={event.flyer_ar}
                      borderRadius="md"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                      alt="Flyer Arabisch"
                      objectFit="cover"
                      width="100%"
                    />
                  </SwiperSlide>
                </Swiper>

                {/* Custom arrow buttons */}
                <IconButton
                  icon={<FaArrowLeft />}
                  aria-label="Previous"
                  className={`swiper-button-prev-${index}`}
                  position="absolute"
                  top="50%"
                  left="-30px"
                  transform="translateY(-50%)"
                  zIndex="10"
                  colorScheme="blue"
                  borderRadius="full"
                  size="sm"
                />
                <IconButton
                  icon={<FaArrowRight />}
                  aria-label="Next"
                  className={`swiper-button-next-${index}`}
                  position="absolute"
                  top="50%"
                  right="-30px"
                  transform="translateY(-50%)"
                  zIndex="10"
                  colorScheme="blue"
                  borderRadius="full"
                  size="sm"
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
}

export default DEvents;
