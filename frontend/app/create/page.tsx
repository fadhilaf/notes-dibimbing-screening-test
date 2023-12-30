// app/create/page.tsx
'use client';

import { Box, Heading, Input, Textarea, Button, VStack, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const AddNotePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const router = useRouter();

  const handleCreateNote = async (e: FormEvent) => {
    e.preventDefault();

    if (title != '' && body != '') {
      const res = await fetch(process.env.API_URL || 'http://localhost:8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      }
    }
    // Optionally, navigate to a different page after adding the note
    // router.push('/notes'); // Import the useRouter hook if needed
  };

  return (
    <form onSubmit={handleCreateNote}>
      <VStack spacing={4} align="stretch" p={4}>
        <Heading>Create Note</Heading>
        
        <Box>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl isRequired>
            <FormLabel>Body</FormLabel>
            <Textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </FormControl>
        </Box>

        <Button type="submit" colorScheme="teal">
          Create Note
        </Button>
      </VStack>
    </form>
  );
};

export default AddNotePage;
