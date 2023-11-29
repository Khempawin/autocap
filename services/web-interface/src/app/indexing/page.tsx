"use client"
import React from 'react';
import { makePostRequest } from '@/utils';

export default function Indexing() {
  const [vector, setVector] = React.useState('');
  const [ids, setIds] = React.useState([]);
  const [response, setResponse] = React.useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // assuming the vector is a string of numbers separated by commas, may need to change
    const vectorArray = vector.split(',').map(Number);
    const jsonData = {"vector": vectorArray};
    const result = await makePostRequest("http://localhost:8000/api/v1/image-2-text", jsonData);
    setResponse(result);
    setIds(result.json().ids);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Indexing UI
      </div>
    </main>
  )
}
