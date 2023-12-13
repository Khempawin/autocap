"use client"
import React, { FormEvent } from "react";
import axios from "axios";
import { iCaption } from "@/interface/caption";
import { useSearchParams } from "next/navigation";

const getCaptionCount = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/caption/info");
  return res.data.caption_count;
};

const getCaptions = async (page: number): Promise<iCaption[]> => {
  const res = await axios.get("http://localhost:8000/api/v1/caption/db/caption-page", {
    params: {
      page: page,
      use_cache: true
    }
  })
  return res.data.result;
}

export default function CaptionDatabase() {
  const [captions, setCaptions] = React.useState<iCaption[]>([]);
  const [newCaption, setNewCaption] = React.useState<string>("");
  const [captionCount, setCaptionCount] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const updateCaptionPage = React.useCallback(async (page: number) => {
    const resCount = await getCaptions(page);
    setCaptions(resCount);
  }, []);

  React.useEffect(() => {
    const initCaptionCount = async () => {
      // request caption count
      const resCount = await getCaptionCount();
      setCaptionCount(resCount);
    }
    initCaptionCount();
  }, []);

  React.useEffect(() => {
    updateCaptionPage(pageNumber);
  }, [pageNumber]);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    alert(`Added ${newCaption}`);
    setNewCaption("");
  };

  const handleNextPage = async () => {
    // updateCaptionPage(pageNumber + 1);
    setPageNumber((n) => n + 1);
  };

  const handlePrevPage = async () => {
    if (pageNumber <= 1) {
      // updateCaptionPage(1);
      setPageNumber(1);
    }
    else {
      // updateCaptionPage(pageNumber - 1);
      setPageNumber((n) => n - 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-4/5">
        <h2 className="m-8">Caption Database UI</h2>
        <ul className="w-4/5">
          <li className="my-4">
            <h4 className="m-8">{`Current Captions in Database : ${captionCount}`}</h4>
          </li>
          <li className="my-4">
            <h4 className="w-4/5 my-4">New Caption</h4>
            <form onSubmit={(e) => {
              handleSubmitForm(e);
            }}>
              <div className="flex">
                <div className="flex-initial w-64">
                  <input type="text" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="Enter a new caption" />
                </div>
                <div className="flex-initial w-32">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Caption
                  </button>
                </div>
              </div>
            </form>
          </li>
          <li className="my-4">
            <h4 className="w-4/5 my-4">Captions</h4>
            <table className="border-separate border border-slate-400">
              <thead>
                <tr>
                  <th className="border border-slate-300">Index</th>
                  <th className="border border-slate-300">Caption</th>
                </tr>
              </thead>
              <tbody>
                {
                  captions.map((caption: iCaption) => {
                    return (
                      <tr key={caption.index} className="my-2">
                        <td className="border border-slate-300">
                          {caption.index}
                        </td>
                        <td className="border border-slate-300">
                          {caption.caption}
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </li>
          <li className="my-4">
            <div className="flex">
              <div className="flex w-32 justify-center">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevPage}>
                  Previous
                </button>
              </div>
              <div className="flex w-32 justify-center">
                {pageNumber}
              </div>
              <div className="flex w-32 justify-center">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  )
}
