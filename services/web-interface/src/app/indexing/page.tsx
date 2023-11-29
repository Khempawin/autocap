"use client"
import React, { useState } from 'react';
import { makePostRequest } from '@/utils';

export default function Indexing() {
  const [ids, setIds] = useState([]);
  const [inputFile, setInputFile] = useState(null);
  const [response, setResponse] = useState({});

  const handleFileChange = (e: any) => {
    if (e.target.files.length > 0) {
      setInputFile(e.target.files[0]);
    }
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    if (inputFile) {
      const formData = new FormData();
      formData.append('vector', inputFile);
      const result = await makePostRequest("http://localhost:8000/api/v1/image-2-text", formData); // TODO change API endpoint 
      setResponse(result);
      setIds(result.ids); // TODO change to response field
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Indexing UI</h2>
        <form onSubmit={submitForm}>
          <ul>
            <li>
              <input type="file" accept='.npy,.npz' onChange={handleFileChange} />
            </li>
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </form>
      </div>
      <div>
        <h2>Returned IDs</h2>
        <pre>{ids}</pre>
      </div>
    </main>
  )
}
