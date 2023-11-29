"use client"
import React from 'react';
import Image from 'next/image';
import { makePostRequest } from '@/utils';


export default function Embedding() {
  const [topK, setTopK] = React.useState<number>(1);
  const [imageData, setImageData] = React.useState<string>("");
  const [inputFile, setInputFile] = React.useState<File>();
  const [response, setResponse] = React.useState({});

  const submitForm = async () => {
    console.log(topK);
    console.log(inputFile);
    const jsonData = { "k": topK, "image": imageData };
    const result = await makePostRequest("http://localhost:8000/api/v1/image-2-text", jsonData);
    setResponse(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <h1>Embedding UI</h1>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}>
          <ul>
            <li>Set Top K</li>
            <li>
              <input type="number"
                placeholder=" Enter Top K"
                style={{ color: 'black' }} // for visibility
                value={topK} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTopK(e.target.value ? Math.max(1, parseInt(e.target.value, 10)) : 0); // TODO clean this up
                  ; console.log(e.target.value)
                }} />
            </li>
            <li>
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
            </li>
            <li>
              <div style={{ maxWidth: "500px", maxHeight: "500px" }}>
                {imageData ? <Image src={imageData} alt="Input Image" width={500} height={500} /> : "No Data"}
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div>
        <h2>Suggested Captions</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </main>
  )
}
