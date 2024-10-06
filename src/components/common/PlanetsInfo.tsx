import { ApiInputs } from "@/types/AstroApi";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { HouseMovesPrediction } from "./PredictionTable";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function PlanetsInfo({ path, inputs, onOutput }: { path: string, inputs: ApiInputs, onOutput?: any }) {
    const url = process.env.API_URL || 'https://json.freeastrologyapi.com';
    const key = process.env.API_KEY || '6zM2HX4qRiakeLxEZJMip6vHAkIZfcBI4Q4rVWKE';
    const horoscope = useFetch(url + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key
        },
        body: JSON.stringify(inputs),
    });
    const [data, setData] = useState<any>();
    useEffect(() => {
        if (horoscope.response) {
            setData(horoscope.response.output);
            if (onOutput) onOutput(horoscope.response);
        }
    }, [horoscope.response, horoscope, data, onOutput]);
    console.log(data);

    return (
        <div className="border p-4 h-[470px] w-[430px]">
            <h1 className="text-3xl font-bold">Bhava Prediction</h1>
            {/* <PlanetsQuickInfo horoscope={horoscope} /> */}
            {(data && data['Ascendant']) ?
                <div className="text-left h-[390px] w-[400px] overflow-y-auto border-y mt-2">
                    <HouseMovesPrediction ascHouseId={data['Ascendant'].current_sign} />
                </div>
                : <p className="text-xl flex justify-center items-center">Loading...</p>}
        </div>
    );
}

// Planets Quick Info   
// function PlanetsQuickInfo({ horoscope }: { horoscope: any }) {
//     return (
//         <>
//             {horoscope.response ? <div className="text-left h-[390px] w-[400px] overflow-y-auto border-y mt-2">
//                 {data && Object.keys(data).map((keyName: string, i: number) => (
//                     <div className="border p-3" key={i.toString()}>
//                         <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-3">{keyName}</h2>
//                         {Object.keys(data[keyName]).map((keyName2: string, k: number) => (
//                             <div key={k.toString()}>
//                                 {
//                                     (keyName2 === 'fullDegree' || keyName2 === 'normDegree') ?
//                                         <p>{keyName2.charAt(0).toUpperCase() + keyName2.replace(/_/g, ' ').slice(1)}: {(data[keyName][keyName2]).toFixed(2) + "°"}</p>
//                                         :
//                                         <p>{keyName2.charAt(0).toUpperCase() + keyName2.replace(/_/g, ' ').slice(1)}: {data[keyName][keyName2]}</p>
//                                 }
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//                 : <p className="h-[390px] w-[400px] flex  justify-center items-center border mt-2 text-xl">Loading...</p>}
//         </>
//     )
// }