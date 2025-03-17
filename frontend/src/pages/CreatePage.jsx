import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    useToast,
    VStack,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const toast = useToast();
    const { createProduct } = useProductStore();
    const { colorMode } = useColorMode();

    // Colors for dark and light modes
    const pageBg = useColorModeValue("white", "black");
    const textColor = useColorModeValue("gray.800", "white");
    const boxBg = useColorModeValue("white", "gray.800");
    const inputBg = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const placeholderColor = useColorModeValue("gray.500", "gray.400");

    // Gradients for heading and button (dark mode: blood‑red metal, light mode: light red)
    const headingGradient = useColorModeValue(
        "linear(to-r, red.300, pink.300)",
        "linear(to-r, red.900, red.700)"
    );
    const buttonGradient = useColorModeValue(
        "linear(to-r, red.300, pink.300)",
        "linear(to-r, red.900, red.700)"
    );

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            isClosable: true,
        });
        setNewProduct({ name: "", price: "", image: "" });
    };

    return (
        <Box minH="100vh" bg={pageBg} color={textColor} py={6}>
            <Container maxW="container.sm">
                <VStack spacing={8}>
                    <Heading
                        as="h1"
                        size="2xl"
                        textAlign="center"
                        mb={8}
                        bgGradient={headingGradient}
                        bgClip="text"
                    >
                        Create New Product
                    </Heading>
                    <Box w="full" bg={boxBg} p={6} rounded="lg" shadow="lg">
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, name: e.target.value })
                                }
                                bg={inputBg}
                                borderColor={borderColor}
                                color={textColor}
                                _placeholder={{ color: placeholderColor }}
                            />
                            <Input
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={newProduct.price}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, price: e.target.value })
                                }
                                bg={inputBg}
                                borderColor={borderColor}
                                color={textColor}
                                _placeholder={{ color: placeholderColor }}
                            />
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={newProduct.image}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, image: e.target.value })
                                }
                                bg={inputBg}
                                borderColor={borderColor}
                                color={textColor}
                                _placeholder={{ color: placeholderColor }}
                            />
                            <Button
                                w="full"
                                bgGradient={buttonGradient}
                                color="white"
                                _hover={{ opacity: 0.9 }}
                                onClick={handleAddProduct}
                            >
                                Add Product
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default CreatePage;
