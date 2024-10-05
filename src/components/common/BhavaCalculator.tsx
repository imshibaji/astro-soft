'use client';
import Checkbox from "@/components/ui/Checkbox";
import InputGroup from "@/components/ui/InputGroup";
import { BhavaDisplay } from "./BhavaDisplay";
import { calculate } from "@/utils/BhavCal";
import { ChangeEvent, useState } from "react";
import { BhavaResult } from "@/types/BhavCal";
import FloatingInput from "../ui/FloatingInput";
export default function BhavaCalculator() {
  const [result, setResult] = useState<BhavaResult>();
  
  return (
    <div>
      <BhavaInputs onResult={(r) => setResult(r)} />
      <BhavaDisplay bhavas={result!} />
    </div>
  )
}

export function BhavaInputs({
  onResult
}: {
  onResult?: (result: BhavaResult) => void
}) {
  const [day, setDay] = useState(10);
  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(1986);
  const [hour, setHour] = useState(20);
  const [minute, setMinute] = useState(5);
  const [timeZoneHour, setTimeZoneHour] = useState(5);
  const [timeZoneMin, setTimeZoneMin] = useState(30);
  const [longitudeDeg, setLongitudeDeg] = useState(88);
  const [longitudeMin, setLongitudeMin] = useState(36);
  const [latitudeDeg, setLatitudeDeg] = useState(22);
  const [latitudeMin, setLatitudeMin] = useState(57);
  const [DST, setDST] = useState(false);
  const [East, setEast] = useState(false);
  const [South, setSouth] = useState(false);
  const handleSubmit = () => {
    const result = calculate({
      mon: month,
      day: day,
      year: year,
      time: {
        hour: hour,
        min: minute
      },
      timeZone: {
        hour: timeZoneHour,
        min: timeZoneMin
      },
      longitude: {
        deg: longitudeDeg,
        min: longitudeMin
      },
      latitude: {
        deg: latitudeDeg,
        min: latitudeMin
      },
      DST: DST,
      East: East,
      South: South
    });
    if (onResult) {
      onResult(result);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
          <FloatingInput label="TimeZoneHour" type="number" placeholder="Hour" size="2" defaultValue={timeZoneHour} onChange={(e: ChangeEvent<HTMLInputElement>) => setTimeZoneHour(Number(e.target.value))} />
          <FloatingInput label="TimeZoneMin" type="number" placeholder="Min" size="2" defaultValue={timeZoneMin} onChange={(e: ChangeEvent<HTMLInputElement>) => setTimeZoneMin(Number(e.target.value))} />
          <Checkbox label="DST" defaultValue={DST} tabIndex="8" onChange={(e: ChangeEvent<HTMLInputElement>) => setDST(e.target.checked)} />
        </div>
        <InputGroup label="Longitude"
          input1={{ type: "number", placeholder: "00", size: "4", defaultValue: latitudeDeg, onChange: (e: ChangeEvent<HTMLInputElement>) => setLongitudeDeg(Number(e.target.value)) }}
          input2={{ type: "number", placeholder: "00", size: "4", defaultValue: latitudeMin, onChange: (e: ChangeEvent<HTMLInputElement>) => setLongitudeMin(Number(e.target.value)) }}
          checkBox={{ label: "East", type: "checkbox", defaultValue: East, tabIndex:"11", onChange: (e: ChangeEvent<HTMLInputElement>) => setEast(e.target.checked)} }
        />
        <InputGroup label="Latitude"
          input1={{ type: "number", placeholder: "00", size: "4", defaultValue: latitudeDeg, onChange: (e: ChangeEvent<HTMLInputElement>) => setLatitudeDeg(Number(e.target.value)) }}
          input2={{ type: "number", placeholder: "00", size: "4", defaultValue: latitudeMin, onChange: (e: ChangeEvent<HTMLInputElement>) => setLatitudeMin(Number(e.target.value)) }}
          checkBox={{ label: "South", type: "checkbox", defaultValue: South, tabIndex:"14", onChange: (e: ChangeEvent<HTMLInputElement>) => setSouth(e.target.checked)} }
        />
        <button type="button" onClick={handleSubmit} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400 focus:outline-none focus:border-teal-400 focus:text-teal-400 disabled:opacity-50 disabled:pointer-events-none">
          Calculate Now
        </button>
      </div>
    </>
  )
}