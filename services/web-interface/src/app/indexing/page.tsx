"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { makePostRequest } from '@/utils';

export default function Indexing() {
  const [ids, setIds] = useState([]);
  const [response, setResponse] = useState({});
  const [inputNumbers, setInputNumbers] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNumbers(e.target.value); 
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const user_ids = inputNumbers.split(',').map(num => parseInt(num.trim()));
    const formData = new FormData();
    formData.append("ids", JSON.stringify(user_ids))
    const result = await makePostRequest("http://localhost:8000/api/v1/image-2-text", formData); // TODO change API endpoint 
    setResponse(result);
    setIds(result.ids); // TODO change to response field
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Indexing UI</h2>
        <form onSubmit={submitForm}>
          <ul>
            <li>
              <input type="text" 
              style={{ color: 'black' }} // for visibility
              placeholder="Enter numbers separated by commas" 
              value={inputNumbers} 
              onChange={handleInputChange} />
            </li>
            <li>
              <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
            </li>
          </ul>
        </form>
      </div>
      <div>
        <h2>Returned IDs</h2>
        <pre>{ids}</pre>
      </div>
      <style jsx>{`
      div {
          margin-bottom: 10px;
          width: 100%; // Ensure divs take the full width
        }
      `}</style>
    </main>
  )
}
