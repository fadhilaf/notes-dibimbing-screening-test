"use client"
import { Box, AbsoluteCenter } from '@chakra-ui/react'

export default function NoteDetailError() {
  return (
    <Box position='relative' w='100vw' h='50vh'>
      <AbsoluteCenter>Tidak ditemukan catatan</AbsoluteCenter>
    </Box>
  )
}
