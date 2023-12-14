"use client";
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import Axios from "axios";
import { CaptionResponse } from '@/interface/responses';

export default function Home() {
  const [topK, setTopK] = useState<number>(1);
  const [imageData, setImageData] = useState<string>("");
  const [inputFile, setInputFile] = useState<File>();
  const [response, setResponse] = useState<CaptionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    let formData = new FormData();
    formData.append("k", topK.toString());
    formData.append("image", inputFile as Blob);

    const headers = { "Content-Type": "multipart/form-data" }
    const result = await Axios.post("/api/v1/image-2-text", formData, { headers })
    setResponse(result);
    setLoading(false);
  };

  const renderCaptions = () => {
    const resultList = response?.data?.result_list;
    if (!resultList || resultList.length === 0) {
      return <p>No Results</p>;
    }

    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caption</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {resultList.map((caption, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{caption}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setImageData(reader.result as string);
      reader.readAsDataURL(file);
      setInputFile(file);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-4xl font-bold mb-8">
          AutoCap: An Automated Caption Recommendation System for Scientific Figures
        </h1>
        <form onSubmit={submitForm} className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <input
              type="number"
              className="p-2 border rounded w-full"
              placeholder="Enter number of captions"
              value={topK}
              onChange={(e) => setTopK(e.target.value ? Math.max(1, parseInt(e.target.value, 10)) : 0)}
            />
            <input
              type="file"
              accept='image/*'
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
            />
          </div>
          {imageData && (
            <div className="boundingBox">
              <Image src={imageData} alt="Input Image" layout="fill" objectFit="contain" />
            </div>
          )}
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
      <div >
        <h2 className="text-center text-4xl font-bold mb-4">Captions</h2>
        <div className="w-full">
          {response ? renderCaptions() : 'Waiting for response...'}
        </div>
      </div>
      <style jsx>{`
        .boundingBox {
          border: 2px solid pink;
          width: 512px;
          height: 512px;
          position: relative;
          margin: 10px auto;
        }
      `}
      </style>
    </main>
  );
}

