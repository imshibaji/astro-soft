'use client';
import { BirthDetails } from "@/utils/AscCal";
import { ChangeEvent, useState } from "react";
import FloatingInput from "../ui/FloatingInput";
import NatalChart from "./NatalChart";

export default function NatalCalculator() {
    const [result, setResult] = useState<BirthDetails>();
    return (
        <div>
            <NatalInputs onResult={(r) => setResult(r)} />
            <NatalChart 
                details={result || {
                    year: 1986,
                    month: 11,
                    day: 10,
                    hours: 20,
                    minutes: 5,
                    latitude: 22,
                    longitude: 88
                }}
                planetPositions={{
                    Su: { degree: 174, rashi: "Vi" },
                    Me: { degree: 180, rashi: "Ca" },
                    Mo: { degree: 285, rashi: "Sc" },
                    Ma: { degree: 266, rashi: "Le" },
                    Ju: { degree: 289, rashi: "Ta" },
                    Ve: { degree: 165, rashi: "Ar" },
                    Sa: { degree: 195, rashi: "Aq" },
                    Ra: { degree: 325, rashi: "Li" },
                    Ke: { degree: 145, rashi: "Pi" }
                }}
            />
        </div>
    )
}

export function NatalInputs({
    onResult
  }: {
    onResult?: (result: BirthDetails) => void
  }) {
    const [day, setDay] = useState(10);
    const [month, setMonth] = useState(11);
    const [year, setYear] = useState(1986);
    const [hour, setHour] = useState(20);
    const [minute, setMinute] = useState(5);
    const [longitude, setLongitude] = useState(88);
    const [latitude, setLatitud] = useState(22);
    const handleSubmit = () => {
      const result: BirthDetails = {
        year,
        month,
        day,
        hours: hour,
        minutes: minute,
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
            <FloatingInput label="Day" type="number" placeholder="Day" size="2" defaultValue={day} onChange={(e: ChangeEvent<HTMLInputElement>) => setDay(Number(e.target.value))} />
            <FloatingInput label="Month" type="number" placeholder="Month" size="2" defaultValue={month} onChange={(e: ChangeEvent<HTMLInputElement>) => setMonth(Number(e.target.value))} />
            <FloatingInput label="Year" type="number" placeholder="Year" size="4" defaultValue={year} onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(Number(e.target.value))} />
          </div>
          <div className="flex space-x-2">
            <FloatingInput label="Hour" type="number" placeholder="Hour" size="2" defaultValue={hour} onChange={(e: ChangeEvent<HTMLInputElement>) => setHour(Number(e.target.value))} />
            <FloatingInput label="Minute" type="number" placeholder="Minute" size="2" defaultValue={minute} onChange={(e: ChangeEvent<HTMLInputElement>) => setMinute(Number(e.target.value))} />
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