'use client'

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button, Checkbox, Container } from '@chakra-ui/react';

const GET_NOTES = gql`
  query GetNotes($fields: [String!]) {
    notes {
      id
      title
      body
      createdAt
    }
  }
`;

type Note = { id: string; title: string; createdAt: string; body: string };
type NoteField = { id: boolean; title: boolean; body: boolean; createdAt: boolean };

const IndexPage = () => {
  const [selectedFields, setSelectedFields] = useState<NoteField>({
    id: true,
    title: true,
    body: true,
    createdAt: true,
  });

  const [executeQuery, setExecuteQuery] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const { loading, error, data, refetch } = useQuery<{ notes: Note[] }>(GET_NOTES, {
    variables: {
      fields: Object.keys(selectedFields).filter(
        (field) => selectedFields[field as keyof typeof selectedFields]
      ),
    },
    skip: !executeQuery,
    onCompleted: (data) => {
      setNotes(data.notes);
    },
  });

  const handleCheckboxChange = (field: keyof typeof selectedFields) => {
    setSelectedFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  const handleSendButtonClick = () => {
    setExecuteQuery(true);
    refetch();
  };

  return (
    <Container>
      <h1>GraphQL Query Builder</h1>

      <div>
        {Object.keys(selectedFields).map((field) => (
          <div key={field}>
            <label>
              <Checkbox
                checked={selectedFields[field as keyof typeof selectedFields]}
                onChange={() => handleCheckboxChange(field as keyof typeof selectedFields)}
              >
                {field}
              </Checkbox>
            </label>
          </div>
        ))}
      </div>

      <Button colorScheme="teal" onClick={handleSendButtonClick}>
        Send
      </Button>

      <hr />

      <h2>Result:</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {notes && (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              {selectedFields.id && <div>ID: {note.id}</div>}
              {selectedFields.title && <div>Title: {note.title}</div>}
              {selectedFields.body && <div>Body: {note.body}</div>}
              {selectedFields.createdAt && <div>Created At: {note.createdAt}</div>}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default IndexPage;
