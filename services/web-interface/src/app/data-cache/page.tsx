"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { makePostRequest } from '@/utils';

export default function DataCaching() {

  const [inputKeys, setInputKeys] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeys(e.target.value);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const keys = inputKeys.split(',').map(key => key.trim());
    const formData = new FormData();
    formData.append("keys", JSON.stringify(keys))
    const result = await makePostRequest("http://localhost:8000/api/v1/keys", formData); // TODO: change endpoint
    setData(result);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Redis Data Fetch UI</h2>
        <form onSubmit={submitForm}>
          <ul>
            <li>
              <input type="text" 
              style={{ color: 'black' }} // for visibility
              placeholder="Enter keys separated by commas" 
              value={inputKeys} 
              onChange={handleInputChange} />
            </li>
            <li>
              <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
            </li>
          </ul>
        </form>
      </div>
      <div>
        <h2>Fetched Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  )
}

  