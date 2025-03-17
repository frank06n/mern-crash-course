import {
    Container,
    SimpleGrid,
    Text,
    VStack,
    Box,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    // Get current color mode and theme-specific colors
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue("white", "black");
    const containerBg = useColorModeValue("red.50", "gray.900"); // subtle background variation for the container
    const headingGradient = useColorModeValue(
        "linear(to-r, red.200, pink.300)",
        "linear(to-r, red.900, red.700)"
    );
    const textColor = useColorModeValue("gray.800", "gray.200");
    const accentLinkColor = useColorModeValue("blue.500", "blue.300");

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Box bg={bgColor} minH="100vh" py={10}>
            <Container maxW="container.xl" bg={containerBg} p={8} borderRadius="lg" boxShadow="lg">
                <VStack spacing={8}>
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        bgGradient={headingGradient}
                        bgClip="text"
                        textAlign="center"
                    >
                        Current Products 🚀
                    </Text>

                    {products.length > 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
                            {products.map((product) => (
                                // Optionally pass down theme colors to ProductCard if needed
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text fontSize="xl" textAlign="center" fontWeight="bold" color={textColor}>
                            No products found 😢{" "}
                            <Link to="/create">
                                <Text
                                    as="span"
                                    color={accentLinkColor}
                                    _hover={{ textDecoration: "underline" }}
                                >
                                    Create a product
                                </Text>
                            </Link>
                        </Text>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default HomePage;
