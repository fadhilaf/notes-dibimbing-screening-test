'use client'

import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Container, Flex, Spacer, Input, FormControl, FormLabel, Textarea, Button } from '@chakra-ui/react'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type NoteDetail = {id: string, title: string, createdAt: string, updatedAt: string, body: string}

export default function NoteUpdate({ note }:{note: NoteDetail}) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const router = useRouter();

  const handleCreateNote = async (e: FormEvent) => {
    e.preventDefault();

    console.log('working', { title, body })

    if (title != '' && body != '') {
      const res = await fetch((process.env.API_URL || 'http://localhost:8000') +`/${note.id}`, {
        method: 'PUT',
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
  }

  return (
    <Container maxW='4xl' padding='4'>
      <form onSubmit={handleCreateNote}>
        <Card>
          <CardHeader>
            <Stack divider={<StackDivider />} spacing='1'>
              <Heading size='xs'>ID: {note.id}</Heading>
              <FormControl isRequired>
                <FormLabel size='xl' fontWeight='800'>Title:</FormLabel>
                <Input 
                  placeholder="Title" 
                  size="lg" fontWeight='700' 
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={note.title}
                />
              </FormControl>
            </Stack>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Flex>
                  <Heading size='xs' textTransform='uppercase'>
                    created at:
                  </Heading>
                  <Text fontSize='xs'>
                    {new Date(note.updatedAt).toLocaleString('id-ID')}
                  </Text>

                  <Spacer/>

                  <Heading size='xs' textTransform='uppercase'>
                    updated at:
                  </Heading>
                  <Text fontSize='xs'>
                    {new Date(note.updatedAt).toLocaleString('id-ID')}
                  </Text>
                </Flex>
              </Box>
              <FormControl isRequired>
                <FormLabel size='xl' fontWeight='800'>Body</FormLabel>
                <Textarea 
                  placeholder="Body" 
                  size="lg" 
                  fontWeight='300' 
                  onChange={(e) => setBody(e.target.value)}
                  defaultValue={note.title}
                />
              </FormControl>
            </Stack>
          </CardBody>
          <Button
            type='submit'
            color="teal.500"
            fontWeight="bold"
            border="2px"
            padding="2"
            margin="2"
            borderRadius="md"
            _hover={{ color: 'teal.700' }}
          >
            Update Note
          </Button>
        </Card>
      </form>
    </Container>
  )
};
