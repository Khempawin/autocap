"use client"
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import Axios from "axios";

interface CaptionResponse { // to parse caption data
  data: {
    result_list: string[];
  };
}

export default function Home() {
  const [topK, setTopK] = useState<number>(1);
  const [imageData, setImageData] = useState<string>("");
  const [inputFile, setInputFile] = useState<File>();
  const [response, setResponse] = useState<CaptionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    // Prepare form data
    let formData = new FormData();
    formData.append("k", topK.toString());
    formData.append("image", inputFile as Blob);

    const headers = {
      "Content-Type": "multipart/form-data"
    }
    const result = await Axios.post("http://localhost:8000/api/v1/image-2-text", formData, {
      headers: headers
    })
    setResponse(result);
    setLoading(false);
  };

  const renderCaptions = () => {
    const resultList = response?.data?.result_list;

    if (!resultList || resultList.length === 0) {
      return <p>No Results</p>;
    }

    return (
      <table className="border-separate border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300">Rank</th>
            <th className="border border-slate-300">Caption</th>
          </tr>
        </thead>
        <tbody>
          {
            resultList.map((caption: string, index: number) => {
              return (
                <tr key={index} className="my-2">
                  <td className="border border-slate-300">
                    {index}
                  </td>
                  <td className="border border-slate-300">
                    {caption}
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-4 leading-tight w-full flex flex-col items-center">AutoCap: Image Captioning as a Service</h1>
        </div>
        <form onSubmit={(e) => {
          submitForm(e);
        }}>
          <div className="w-full flex flex-col items-center">
            <p>Number of captions to view</p>
          </div>
          <div className="w-full flex flex-col items-center">
            <input type="number"
              placeholder="Enter number of captions"
              style={{
                padding: '5px', 
                fontSize: '0.8rem',
                height: '30px', 
                width: '100px', 
                boxSizing: 'border-box', 
                color: 'black'
              }}
              value={topK} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTopK(e.target.value ? Math.max(1, parseInt(e.target.value, 10)) : 0); // TODO clean this up
              }} />
          </div>
          <div className="w-full flex flex-col items-center">
            <input type="file" accept='image/*' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            } />
          </div>
          <div className={imageData ? "boundingBox" : ""}>
            {imageData ? (
              <Image src={imageData} alt="Input Image" layout="fill" objectFit="contain" />
            ) : (
              "No Data"
            )}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
        </form>
      </div>
      <div className="w-full flex flex-col items-center">
        <h4 className="w-full flex flex-col items-center">Captions</h4>
        <div className="w-full flex flex-col items-center">
          {response ? renderCaptions() : 'Waiting for response...'}
        </div>
      </div>
      <style jsx>{`
        body {
          background-color: white;
        }
        .boundingBox {
          border: 2px solid pink;
          width: 512px;
          height: 512px;
          position: relative;
          margin: 0 auto; // This will center the boundingBox horizontally
        }
        div {
          margin-bottom: 10px;
          width: 100%; // Ensure divs take the full width
        }
      `}</style>

    </main>
  )
}

