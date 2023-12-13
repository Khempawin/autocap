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
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Caption</th>
          </tr>
        </thead>
        <tbody>
          {resultList.map((item: any, index: any) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <h1>AutoCap: Image Captioning as a Service</h1>
        </div>
        <form onSubmit={(e) => {
          submitForm(e);
        }}>
          <div>
            <p>Number of captions to view</p>
          </div>
          <div>
            <input type="number"
              placeholder="Enter number of captions"
              style={{ color: 'black' }} // for visibility
              value={topK} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTopK(e.target.value ? Math.max(1, parseInt(e.target.value, 10)) : 0); // TODO clean this up
              }} />
          </div>
          <div>
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
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
        </form>
      </div>
      <div>
        <h2>Suggested Captions</h2>
        <div>
          {response ? renderCaptions() : 'Waiting for response...'}
        </div>
      </div>
      <style jsx>{`

        

/* Styles for dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: white;
  }
}

        body {
          background-color: white;
        }
        .boundingBox {
          border: 2px solid pink;
          width: 512px;
          height: 512px;
          position: relative;
        }

        button {
          padding: 10px 15px;
          border: 2px solid #295e48;
          background-color: transparent;
          color: #295e48;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }

        button:hover {
          background-color: #295e48;
          color: white;
        }
        .table-container {
          margin: 20px 0;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #f8f8f8;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        th, td {
          text-align: left;
          padding: 12px 15px;
          border-bottom: 1px solid red;
        }
        th {
          background-color: #4CAF50;
          color: white;
        }
        tbody tr:nth-child(odd) {
          background-color: #c8e6c9;
        }
        tbody tr:hover {
          background-color: #c8e6c9;
        }
        div {
          margin-bottom: 10px;
        }
      `}</style>
    </main>
  )
}

