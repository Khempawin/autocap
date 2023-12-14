"use client";

import React, { useState, ChangeEvent } from 'react';
import Axios from "axios";
import { CacheData } from '@/interface/responses';


export default function DataCaching() {
  const [inputKeys, setInputKeys] = useState('');
  const [data, setData] = useState<CacheData>({ results: {} });
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeys(e.target.value);
  };

  const fetchCache = async () => {
    setLoading(true);
    setFetched(true);
    try {
      const response = await Axios.get("/api/v1/redis/cache");
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching cache data:", error);
    }
    setLoading(false);
  };

  const deleteCacheRecord = async (id: string) => {
    setLoading(true);
    const numericId = parseInt(id, 10);
    try {
      const response = await Axios.delete(`/api/v1/redis/remove-cache?id=${numericId}`);
      alert(response.data.result);
    } catch (error) {
      console.error("Error deleting cache record:", error);
    }
    setLoading(false);
  };


  const renderCacheTable = () => {
    const cacheEntries = Object.entries(data.results || {});

    if (cacheEntries.length === 0) {
      return <p>{fetched ? "No cache data found." : "Fetch cache to view results"}</p>;
    }

    return (
      <table className="min-w-full divide-y divide-gray-200 max-w-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cache Key
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cacheEntries.map(([key, value]) => (
            <tr key={key}>
              <td className="px-6 py-4">
                {key}
              </td>
              <td className="px-6 py-4">
                {value.length >= 256 ? value.slice(0, 1024) + "..." : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-xl">
        <h1 className="text-center text-4xl font-bold mb-8">Redis Data UI</h1>
        <button onClick={fetchCache} disabled={loading} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {loading ? 'Loading...' : 'Fetch Cache'}
        </button>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Enter cache key to delete"
            value={inputKeys}
            onChange={handleInputChange}
          />
          <button
            onClick={() => deleteCacheRecord(inputKeys)}
            disabled={loading || inputKeys === ''}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Deleting...' : 'Delete Cache Record'}
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-semibold my-4">Cache Data</h2>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {loading ? 'Fetching data...' : renderCacheTable()}
          </div>
        </div>
      </div>
    </main>
  )
}
