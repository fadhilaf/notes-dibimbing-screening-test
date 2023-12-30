import NoteDetail from "./noteDetail";

// app/[id]/page.tsx
type NoteDetail = {id: string, title: string, createdAt: string, updatedAt: string, body: string}

export default async function Page({
  params
}: {
  params: { id: string }
}) {
  const noteResponse = await fetch(
    (process.env.API_URL || 'http://localhost:8000') + '/' + params.id,
    {cache: 'no-cache'}
  )
    
  if (!noteResponse.ok) {
    throw new Error(`Network response was not ok. Status: ${noteResponse.status}`);
  }

  const note = await noteResponse.json() as NoteDetail;

  return (
    <NoteDetail note={note}/>
  )
}
