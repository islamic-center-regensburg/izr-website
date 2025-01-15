import useFetchBlogPosts from "../../hooks/useFetchBlogPosts";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
  VStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import Skeleton from "../Skeleton";
import useResponsiveBreakpoints from "../../hooks/useResponsiveBreakpoints";

function DBlog() {
  const { blogPosts, error, loading } = useFetchBlogPosts();
  const { isMobile } = useResponsiveBreakpoints();

  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };
  if (error) return <Text>Server Error</Text>;
  if (loading) return <Skeleton />;
  return (
    <VStack id="blog">
      <Heading width={"100%"}>Blogs</Heading>
      <Accordion width={"100%"} allowMultiple>
        {blogPosts?.map((blogPost) => (
          <>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    fontWeight={"semibold"}
                    fontSize={"xl"}
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    {blogPost.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {blogPost.content_items.map((item, idx) => (
                  <VStack width={"100%"} key={idx}>
                    {item.content_type === "paragraph" && (
                      <Text width={"100%"}>{formatText(item.text)}</Text>
                    )}
                    {item.content_type === "header" && (
                      <Heading fontSize={"l"} width={"100%"}>
                        {item.text}
                      </Heading>
                    )}

                    {item.image && (
                      <>
                        <br />
                        <Image
                          width={isMobile ? "95%" : "40%"}
                          borderRadius="10px"
                          overflow={"hidden"}
                          src={item.image}
                          alt={`Image for ${blogPost.title}`}
                        />
                      </>
                    )}
                    <br />
                  </VStack>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </VStack>
  );
}

export default DBlog;
