'use client'

import { Flex, Button, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }:{currentPage: number, totalPages: number, onPageChange: (page:number) => void}) => {
  const displayedPages = 5;

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));

    for (let i = startPage; i <= Math.min(totalPages, startPage + displayedPages - 1); i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Flex align="center" justify="center" mt={4}>
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        isDisabled={currentPage === 1}
        mr={2}
      >
        Previous
      </Button>

      {generatePageNumbers().map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={currentPage === page ? "solid" : "outline"}
          colorScheme={currentPage === page ? "teal" : "gray"}
          mx={1}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        isDisabled={currentPage === totalPages}
        ml={2}
      >
        Next
      </Button>

      <Text mx={2}>
        Page {currentPage} of {totalPages}
      </Text>
    </Flex>
  );
};

export default Pagination;
