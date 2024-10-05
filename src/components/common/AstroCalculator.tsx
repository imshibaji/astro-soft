/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ApiInputsData } from "@/utils/AstroApi";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import FloatingInput from "../ui/FloatingInput";
import { AstroApiResponse } from "@/types/AstroApi";
import { AstroApiLoader } from "../actions/AstroApiLoader";

const apiData = {
    year: 1986,
    month: 11,
    date: 10,
    hours: 20,
    minutes: 5,
    seconds: 0,
    latitude: 22,
    longitude: 88,
    timezone: 5.5,
};

export default function AstroCalculator() {
    const [inputData, setInputData] = useState<ApiInputsData>(apiData);
    const [chart1, setChart1] = useState('');
    const [chart2, setChart2] = useState('');
    const [infoData, setInfoData] = useState<AstroApiResponse>();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try{
        if (!loaded) {
            AstroApiLoader(inputData).then(({hcData, ncData, infoData}) => {
                setChart1(hcData.output);
                setChart2(ncData.output);
                setInfoData(infoData.output);
                setLoaded(true);
                console.log(hcData, ncData, infoData);
            });
        }
        } catch (error) {
            console.log(error);
        }
    }, [inputData, loaded]);

    const onInputChange = (inputData: ApiInputsData) => {
        setInputData(inputData);
        setLoaded(false);
    };  
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AstroApiInputs onResult={(inputsData) => onInputChange(inputsData)} />
            <AstroApiDisplay inputsData={apiData} chart1={chart1} chart2={chart2} summary={infoData}  />
        </Suspense>
    )
}


export function AstroApiDisplay({inputsData, chart1, chart2, summary}: {
    inputsData?: any,
    chart1: string
    chart2: string
    summary?: AstroApiResponse
}) {
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
              <div className="text-center p-3">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Horoscope Chart</h2>
                <div className="w-[400px] h-[400px]" dangerouslySetInnerHTML={{ __html: chart1 }}/>
              </div>
              <div className="text-center p-3">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Navamsa Chart</h2>
                <div className="w-[400px] h-[400px]" dangerouslySetInnerHTML={{ __html: chart2 }}/>
              </div>
              <div className="text-center p-3 w-[400px] h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Summary</h2>
                <div className="text-left">
                    <p>Horoscope: Birthday of {inputsData!.date} {inputsData!.month} {inputsData!.year}</p>
                    {summary ? <div>
                        <p>Lagna Rashi: {summary.Ascendant.zodiac_sign_name}</p>
                        <p>Moon Rashi: {summary.Moon.zodiac_sign_name}</p>
                    </div>: null}
                </div>
              </div>
            </div>
        </div>
    );
}

export function AstroApiInputs({
    onResult
  }: {
    onResult?: (result: ApiInputsData) => void
  }) {
    const [date, setDate] = useState(10);
    const [month, setMonth] = useState(11);
    const [year, setYear] = useState(1986);
    const [hours, setHours] = useState(20);
    const [minutes, setMinutes] = useState(5);
    const [longitude, setLongitude] = useState(88);
    const [latitude, setLatitud] = useState(22);
    const handleSubmit = () => {
      const result: ApiInputsData = {
        year,
        month,
        date,
        hours,
        minutes,
        latitude,
        longitude,
      }
      if (onResult) {
        onResult(result);
      }
    };
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="flex space-x-2">
            <FloatingInput label="Day" type="number" placeholder="Day" size="2" defaultValue={date} onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(Number(e.target.value))} />
            <FloatingInput label="Month" type="number" placeholder="Month" size="2" defaultValue={month} onChange={(e: ChangeEvent<HTMLInputElement>) => setMonth(Number(e.target.value))} />
            <FloatingInput label="Year" type="number" placeholder="Year" size="4" defaultValue={year} onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(Number(e.target.value))} />
          </div>
          <div className="flex space-x-2">
            <FloatingInput label="Hour" type="number" placeholder="Hour" size="2" defaultValue={hours} onChange={(e: ChangeEvent<HTMLInputElement>) => setHours(Number(e.target.value))} />
            <FloatingInput label="Minute" type="number" placeholder="Minute" size="2" defaultValue={minutes} onChange={(e: ChangeEvent<HTMLInputElement>) => setMinutes(Number(e.target.value))} />
          </div>
          <div className="flex space-x-2">
            <FloatingInput label="Longitude" type="number" placeholder="Hour" size="2" defaultValue={longitude} onChange={(e: ChangeEvent<HTMLInputElement>) => setLongitude(Number(e.target.value))} />
            <FloatingInput label="Latitude" type="number" placeholder="Min" size="2" defaultValue={latitude} onChange={(e: ChangeEvent<HTMLInputElement>) => setLatitud(Number(e.target.value))} />
          </div>
          <button type="button" onClick={handleSubmit} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400 focus:outline-none focus:border-teal-400 focus:text-teal-400 disabled:opacity-50 disabled:pointer-events-none">
            Calculate Now
          </button>
        </div>
      </>
    )
  }