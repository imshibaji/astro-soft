'use client';
import { Card, CardBody } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ApiInputsData } from "@/utils/AstroApi";
import { useState } from "react";

import { PlanetsInfo } from "@/components/common/PlanetsInfo";
import HoroscopeChart from "@/components/common/HoroscopeChart";
import FloatingInput from "@/components/ui/FloatingInput";
import { AstroApiResponse } from "@/types/AstroApi";
import PredictionTable from "@/components/common/PredictionTable";


export default function Prediction({searchParams}: {searchParams: {[key: string]: string}}) {
    const params = searchParams;
    const inputs = {
        year: Number(params.year || 1986),
        month: Number(params.month || 11),
        date: Number(params.date || 10),
        hours: Number(params.hour || 20),
        minutes: Number(params.minute || 5),
        seconds: Number(params.second || 0),
        latitude: Number(params.latitude || 22),
        longitude: Number(params.longitude || 88),
        timezone: Number(params.timeZone || 5.5),
        settings: { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" },
        config: { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" },
        chart_config: {
            native_name: ((params.firstName || "Astro") + " " + (params.lastName || "Soft")),
            chart_style: params.chart_style || "north_india",  /* south_india / north_india */
            sign_number_font_color: "#A5243D", /* works for north_india chart only */
        },
    } as ApiInputsData;
    
    const [planets, setPlanets] = useState<AstroApiResponse>({} as AstroApiResponse);
    // console.log(planets);
    
    return (
       <>
           <Container>
               <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-3">Prediction</h1>
                <div className="w-[300px]">
                    <FloatingInput label="Chart Style" name="chart_style" defaultValue={inputs.chart_config!.chart_style} readOnly /> 
                </div>
               </div>
               <Card>
                <CardBody>
                    <h1 className="text-3xl text-center font-bold">Vedic Charts and Prediction</h1>
                    <p className="text-center text-lg font-bold mb-3">
                        {searchParams.firstName? `${searchParams.firstName} ${searchParams.lastName}`:'Shibaji Debnath'}&#39;s 
                        Birth Date: {inputs.date} {inputs.month} {inputs.year}, 
                        Time: {inputs.hours}:{inputs.minutes}:{inputs.seconds}, 
                        Location: {inputs.latitude}, {inputs.longitude}, 
                        TimeZone: {inputs.timezone}.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center my-5">
                        <HoroscopeChart title="Horoscope Chart" path="/horoscope-chart-svg-code" inputs={inputs} />
                        <HoroscopeChart title="Navamsa Chart" path="/navamsa-chart-svg-code" inputs={inputs} />
                        <PlanetsInfo path="/planets/extended" inputs={inputs} onOutput={setPlanets} />
                    </div>
                    <div className="justify-center items-center my-5">
                        {
                            planets.output ? <PredictionTable planetsInfo={planets.output} /> 
                            : <p className="text-xl w-[400px] h-[400px] flex justify-center items-center">Loading...</p>
                        }
                        {/* <PredictionTable planetsInfo={ApiData.output} /> */}
                    </div>
                </CardBody> 
               </Card>
           </Container>
       </>
    )
}