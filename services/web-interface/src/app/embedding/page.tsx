"use client";
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import Axios from "axios";
import { EmbedResponse } from '@/interface/responses';


export default function Embedding() {
  const [imageData, setImageData] = useState<string>("");
  const [inputFile, setInputFile] = useState<File>();
  const [inputCaption, setInputCaption] = useState("");
  const [imageResponse, setImageResponse] = useState<EmbedResponse>({ data: { result: [] } });
  const [captionResponse, setCaptionResponse] = useState<EmbedResponse>({ data: { result: [] } });
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const headers = {
      "Content-Type": "multipart/form-data"
    }
    if (inputFile) {
      let formData = new FormData();
      formData.append("image", inputFile as Blob);
      let result = await Axios.post("/api/v1/embed/image", formData, {
        headers: headers
      })
      setImageResponse(result);
    }
    if (inputCaption) {
      let formData = new FormData();
      formData.append("caption", inputCaption);
      let result = await Axios.post("/api/v1/embed/caption", formData, {
        headers: headers
      })
      setCaptionResponse(result);
    }
    setLoading(false);
  };

  const handleLoad = (name: string) => {
    if (loading) {
      return `Fetching ${name} embedding`
    }
    return `Post ${name} to view embedding`
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
      setInputFile(file);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-4xl font-bold mb-8">Embedding UI</h1>
        <form onSubmit={submitForm} className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <input type="file" accept='image/*' className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={handleImageChange} />
            <input type="text" className="w-full p-2 border rounded" placeholder="Enter caption to embed" value={inputCaption} onChange={(e) => setInputCaption(e.target.value)} />
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
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex-1 min-w-0 max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-center text-4xl font-bold mb-8">Image Embedding</h2>
          <p>{imageResponse.data?.result?.length === 0 ? handleLoad("image") : imageResponse.data.result.join(', ')}</p>
        </div>
        <div className="flex-1 min-w-0 max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-center text-4xl font-bold mb-8">Caption Embedding</h2>
          <p>{captionResponse.data?.result?.length === 0 ? handleLoad("caption") : captionResponse.data.result.join(', ')}</p>
        </div>
      </div>

      <style jsx>{`
        .boundingBox {
          border: 2px solid pink;
          width: 512px;
          height: 512px;
          position: relative;
          margin: 0 auto;
        }
      `}</style>
    </main>
  );
}
