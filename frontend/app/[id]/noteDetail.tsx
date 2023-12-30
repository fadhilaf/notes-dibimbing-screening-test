'use client'

import NextLink from 'next/link';
import { Link } from '@chakra-ui/next-js'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Container, Flex, Spacer } from '@chakra-ui/react'

type NoteDetail = {id: string, title: string, createdAt: string, updatedAt: string, body: string}

export default function NoteDetail({ note }:{note: NoteDetail}) {
  return (
    <Container maxW='4xl' padding='4'>
      <Card>
        <CardHeader>
          <Stack divider={<StackDivider />} spacing='1'>
            <Flex>
              <Heading size='xs'>ID: {note.id}</Heading>
              <Spacer/>
              <Box margin='1'>
                <Link
                  as={NextLink}
                  href={`/${note.id}/edit`}
                  color="teal.500"
                  fontWeight="bold"
                  border="2px"
                  padding="2"
                  borderRadius="md"
                  _hover={{ color: 'teal.700' }}
                >
                  Edit Note
                </Link>
              </Box>
            </Flex>
            <Heading size='xl'>Title: {note.title}</Heading>
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
                  {new Date(note.createdAt).toLocaleString('id-ID')}
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
            <Box>
              <Heading size='sm' paddingBottom='2' textTransform='uppercase'>
                Body
              </Heading>
              <Text whiteSpace="pre-line">
                {note.body}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  )
};
