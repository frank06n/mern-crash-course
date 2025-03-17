import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
    VStack,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode } = useColorMode();

    // Dynamic theming based on light/dark mode
    const cardBg = useColorModeValue("white", "black");
    const cardText = useColorModeValue("gray.800", "white");
    const accentGradient = useColorModeValue(
        "linear(to-r, red.200, pink.300)",
        "linear(to-r, red.900, red.700)"
    );
    const modalInputBg = useColorModeValue("gray.100", "gray.700");
    const modalInputBorder = useColorModeValue("gray.300", "gray.600");
    const modalInputPlaceholder = useColorModeValue("gray.500", "gray.400");

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        toast({
            title: success ? "Success" : "Error",
            description: success ? "Product updated successfully" : message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={cardBg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w="full"
                objectFit="cover"
            />

            <Box p={4}>
                <Heading
                    as="h3"
                    size="md"
                    mb={2}
                    bgGradient={accentGradient}
                    bgClip="text"
                >
                    {product.name}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" color={cardText} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={onOpen}
                        colorScheme="blue"
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme="red"
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent bg={cardBg} color={cardText}>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        name: e.target.value,
                                    })
                                }
                                bg={modalInputBg}
                                borderColor={modalInputBorder}
                                color={cardText}
                                _placeholder={{ color: modalInputPlaceholder }}
                            />
                            <Input
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        price: e.target.value,
                                    })
                                }
                                bg={modalInputBg}
                                borderColor={modalInputBorder}
                                color={cardText}
                                _placeholder={{ color: modalInputPlaceholder }}
                            />
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        image: e.target.value,
                                    })
                                }
                                bg={modalInputBg}
                                borderColor={modalInputBorder}
                                color={cardText}
                                _placeholder={{ color: modalInputPlaceholder }}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bgGradient={accentGradient}
                            color="white"
                            mr={3}
                            _hover={{ opacity: 0.9 }}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
