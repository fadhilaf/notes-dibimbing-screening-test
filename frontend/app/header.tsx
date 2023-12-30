// components/Header.js
'use client'

import { Box, Flex, Spacer } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js'

const Header = () => {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex>
        <Box p="2">
          <Link href="/">
            Note app
          </Link>
        </Box>
        <Spacer />
        <Box p="2">
          <Link href="/">REST API</Link>
        </Box>
        <Box p="2">
          <Link href="/graphql">GraphQL</Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
