import React from "react";
import { Box, Heading, Flex, Text, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Navbar = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="black"
      color="white"
      marginBottom="1.5rem"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link as={RouterLink} to="/">
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            <SearchIcon /> SearchEngine
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <Link as={RouterLink} to="/search">
            Search
          </Link>
        </MenuItems>
        <Link as={RouterLink} to="/about">
          <MenuItems>About</MenuItems>
        </Link>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      ></Box>
    </Flex>
  );
};

export default Navbar;
