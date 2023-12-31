"use client"
import React, { FormEvent } from "react";
import axios from "axios";
import { iCaption } from "../interface/caption";



const getCaptionCount = async () => {
    const res = await axios.get(`/api/v1/caption/info`);
    return res.data.result;
};

const getCaptions = async (page: number): Promise<iCaption[]> => {
    const res = await axios.get(`/api/v1/caption/db/caption-page`, {
        params: {
            page: page,
            use_cache: true
        }
    })
    return res.data.result;
}

const getCaptionById = async (id: number): Promise<string> => {
    const res = await axios.get(`/api/v1/caption/db/caption`, {
        params: {
            id,
            use_cache: true
        }
    })
    return res.data.result;
}

export default function CaptionDatabase() {
    const [captions, setCaptions] = React.useState<iCaption[]>([]);
    const [captionId, setCaptionId] = React.useState<number | undefined>();
    const [captionCount, setCaptionCount] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [targetCaption, setTargetCaption] = React.useState<string>("");

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

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        if (!captionId) {
            return;
        }
        const result_caption = await getCaptionById(captionId);
        setTargetCaption(result_caption);
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
        <ul className="w-4/5">
            <li className="my-4">
                <h4 className="m-8">{`Current Captions in Database : ${captionCount}`}</h4>
            </li>
            <li className="my-4">
                <h4 className="w-4/5 my-4">Search Caption by ID</h4>
                <form onSubmit={(e) => {
                    handleSubmitForm(e);
                }}>
                    <div className="flex">
                        <div className="flex-initial w-64">
                            <input type="number" value={captionId} onChange={(e) => setCaptionId(parseInt(e.target.value))} placeholder="Enter a caption id" className="w-4/5 p-2 border rounded" />
                        </div>
                        <div className="flex-initial w-32">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Search Caption
                            </button>
                        </div>
                        <div className="flex-initial w-96 mx-8">
                            <p>
                                {targetCaption}
                            </p>
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
    )
}
