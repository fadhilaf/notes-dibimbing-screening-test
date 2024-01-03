'use client'

import NextLink from 'next/link';
import { Link } from '@chakra-ui/next-js'
import { Container, Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text, Button, Wrap, WrapItem, AbsoluteCenter } from '@chakra-ui/react'

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from './pagination';

type Note = {id: string, title: string, createdAt: string, body: string}

export default function NotesContainer({ notes, maxPage }: {notes: Note[], maxPage: number}) {
  const { push, refresh } = useRouter();
  const page = useSearchParams().get('page') || '1';

  const handleDeleteNote = async (noteId: string) => {
    try {
      // Send a DELETE request to your API
      const response = await fetch((process.env.API_URL || 'http://localhost:8000') + '/' + noteId, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Error deleting post. Status: ${response.status}`);
      }

      // Refresh the page
      refresh();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container maxW='6xl' padding='4'>
      <Button>Delete All</Button>
      <Wrap>
        {notes.length != 0 ? (notes.map((note, index) => (
          <WrapItem key={index}>
            <Card w='500px' h='250px' variant='outline'>
              <Link href={`/${note.id}`}>
                <CardHeader>
                  <Heading size='md'>
                      {note.title}
                  </Heading>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing='1'>
                    <Box>
                      <Text pt='1' fontSize='xs'>
                        {new Date(note.createdAt).toLocaleString('id-ID')}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        Body
                      </Heading>
                      <Text pt='2' fontSize='sm'>
                        {note.body}{note.body.length == 64 ? '...' : ''}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Link> 

              <CardFooter>
                <Button onClick={() => {handleDeleteNote(note.id)}} variant='solid' colorScheme='red'>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </WrapItem>
        ))) : (
          <Box position='relative' w='100vw' h='10vh'>
            <AbsoluteCenter>Tidak ada catatan</AbsoluteCenter>
          </Box>
        )}
      </Wrap>

      <Pagination currentPage={parseInt(page)} totalPages={maxPage} onPageChange={(page) => {push('?page='+page)}} />

      <Box>
        <Link
          as={NextLink}
          href="/create"
          color="teal.500"
          fontWeight="bold"
          textDecoration="underline"
          border="2px"
          padding="2"
          borderRadius="md"
          _hover={{ color: 'teal.700' }}
        >
          Create Note
        </Link>
      </Box>
    </Container>
  )
}
