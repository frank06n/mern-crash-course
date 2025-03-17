import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Text,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    // Colors based on the current mode
    const bg = useColorModeValue("white", "black");
    const navBg = useColorModeValue("red.50", "gray.900"); // Container background for navbar area
    const gradientText = useColorModeValue(
        "linear(to-r, red.200, pink.300)",
        "linear(to-r, red.900, red.700)"
    );
    const buttonBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const hoverBg = useColorModeValue("red.100", "red.800");

    return (
        <Box bg={bg} boxShadow="md" w="full">
            <Container maxW="container.xl" py={4} bg={navBg} borderRadius="md">
                <Flex
                    align="center"
                    justify="space-between"
                    flexDir={{ base: "column", sm: "row" }}
                >
                    <Text
                        fontSize={{ base: "22px", sm: "28px" }}
                        fontWeight="bold"
                        textTransform="uppercase"
                        bgGradient={gradientText}
                        bgClip="text"
                        textAlign="center"
                    >
                        <Link to="/">Product Store 🛒</Link>
                    </Text>
                    <HStack spacing={4} mt={{ base: 4, sm: 0 }}>
                        <Link to="/create">
                            <Button
                                bg={buttonBg}
                                border="1px solid"
                                borderColor={borderColor}
                                _hover={{ bg: hoverBg }}
                            >
                                <PlusSquareIcon fontSize="20px" />
                            </Button>
                        </Link>
                        <Button
                            onClick={toggleColorMode}
                            bg={buttonBg}
                            border="1px solid"
                            borderColor={borderColor}
                            _hover={{ bg: hoverBg }}
                        >
                            {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
                        </Button>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;
