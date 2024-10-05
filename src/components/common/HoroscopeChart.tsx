/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiInputs } from "@/types/AstroApi";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

export default function HoroscopeChart({title, path, inputs, reload = false}: {
    title?: string, path: string, inputs: ApiInputs, reload?: boolean}) {
    const url = process.env.API_URL || 'https://json.freeastrologyapi.com';
    const key = process.env.API_KEY || '6zM2HX4qRiakeLxEZJMip6vHAkIZfcBI4Q4rVWKE';
    const chart = useFetch(url+path,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key
        },
        body: JSON.stringify(inputs),
    });
    const [data, setData] = useState<any>();
    useEffect(() => {
        if (chart.response) {
            setData(chart.response.output);
        }
        if(inputs && reload) {
            chart.reload(true);
        }
    },[chart.response, reload, inputs, chart, data]);
    return (
        <div className="border p-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-2">{title || "Horoscope Chart"}</h1>
            { data ? <div className="w-[400px] h-[400px]" dangerouslySetInnerHTML={{ __html: data }}></div> : <p>Loading...</p> }
        </div>
    );
}