"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from "axios";

export default function Indexing() {
  const [ids, setIds] = useState<number[]>([]);
  const [response, setResponse] = useState({});
  const [inputNumbers, setInputNumbers] = useState('');
  const [k, setK] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNumbers(e.target.value);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const dimension_values = inputNumbers.split(',').map(num => parseInt(num.trim()));
    if (dimension_values.length !== 512) {
      alert("Vector length has to be 512.");
      setLoading(false);
      return;
    }
    const data = {
      "k": k,
      "vector": dimension_values
    };
    const res = await axios.post("/api/v1/indexing/retrieve-index", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    setResponse(res.data);
    setIds(res.data.result);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-1 min-w-0 w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-4xl font-bold mb-8">Indexing UI</h1>
        <form onSubmit={submitForm}>
          <ul>
            <li className="my-2 w-full">
              <p>Vector of 512 numbers</p>
              <input type="text-area"
                style={{ color: 'black' }} // for visibility
                placeholder="Enter numbers separated by commas"
                value={inputNumbers}
                onChange={handleInputChange}
                className="w-4/5 p-2 border rounded h-48" />
            </li>
            <li className="my-2">
              <p>Top K</p>
              <input type="number" value={k} onChange={(e) => setK(parseInt(e.target.value))} placeholder='Enter top k' className="w-4/5 p-2 border rounded" />
            </li>
            <li className="justify-center my-2 w-1/12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
            </li>
          </ul>
        </form>
        <h2>Returned IDs</h2>
        <pre>{ids?.map((n) => {
          return `${n}, `;
        })}</pre>
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
