import NotesContainer from "./notesContainer";

// app/page.tsx
type GetAllNotesResponse = {
  maxPage: number,
  notes: {id: string, title: string, createdAt: string, body: string}[]
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams?.page || '1';

  const notesResponse = await fetch(
    (process.env.API_URL || 'http://localhost:8000') + '?page=' + page,
    {cache: 'no-cache'}
  )
    
  if (!notesResponse.ok) {
    throw new Error(`Network response was not ok. Status: ${notesResponse.status}`);
  }

  const notes = await notesResponse.json() as GetAllNotesResponse;

  return (
    <NotesContainer notes={notes.notes} maxPage={notes.maxPage}/>
  )
}
