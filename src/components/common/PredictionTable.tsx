/* eslint-disable @typescript-eslint/no-explicit-any */
import Rashis from "@/data/rashis.json";
import Planets from "@/data/planets.json";
import Nakshatras from "@/data/nakshatras.json";
import PlanetMoves from "@/data/planet_moves.json";
import Houses from "@/data/houses.json";
import HouseMoves from "@/data/house_lord_moves.json";
import { DataAccordion } from "../ui/Accordion";
import Hr from "../ui/Hr";
import { useEffect, useState } from "react";


export default function PredictionTable({ planetsInfo }: { planetsInfo: any }) {
    const [dataInput, setDataInput] = useState<any>(planetsInfo);
    const [predictionInfo, setPredictionInfo] = useState<any[]>(proccessData(dataInput));
    
    // console.log(predictionInfo);
    // const housesMoves = houseMovesIds(predictionInfo[0].current_sign);
    // console.log(housesMoves);

    useEffect(() => {
        async function fetchData() {
            const info = proccessData(dataInput);
            setPredictionInfo(info);
            setDataInput(planetsInfo);
        }
        fetchData();
    }, [planetsInfo, dataInput]);

    return (
        <div className="w-full text-left">
            <h1 className="text-3xl font-bold mb-3 text-center">Planets Predictions</h1>
            {predictionInfo && predictionInfo[0] && predictionInfo[2] ? 
            <div>
                <h2 className="text-center text-xl font-bold text-gray-800 dark:text-neutral-300 mb-3">
                    Laga Rashi: {predictionInfo[0].zodiac_sign_name},
                    Moon Rashi: {predictionInfo[2].zodiac_sign_name}
                </h2>
                <DataAccordion datas={dataBody(predictionInfo)} />
            </div>: null}
        </div>
    )
}

function dataBody(predictionInfo: any) {
    return predictionInfo.map((data: any) => {
        return {
            title: data.name + ' in ' + data.zodiac_sign_name + ' Rashi, at ' + data.normDegree.toFixed(0) + '° Degree',
            content: dataContent(data),
        }
    })
}

function dataContent(data: any) {
    return (
        <div>
            <div className="border border-gray-200 dark:border-neutral-700 p-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-3">
                    {data.name} in {data.zodiac_sign_name} Rashi, {data.name} Aspects: {(data.planet === null || data.planet === undefined) ? 'None' : data.planet.aspect}
                </h3>
                <p>
                    <span className="font-bold">Rashi Name:</span> {data.zodiac_sign_name},
                    <span className="font-bold"> Rashi Lord:</span> {data.zodiac_sign_lord},
                    <span className="font-bold"> Element:</span> {data.rashi_prediction.element},
                    <span className="font-bold"> Type:</span> {data.rashi_prediction.type},
                    <span className="font-bold"> Nakshatra:</span> {data.nakshatra_name},
                    <span className="font-bold"> Pada:</span> {data.nakshatra_pada},
                    <span className="font-bold"> Nakshatra Lord:</span> {data.nakshatra_vimsottari_lord}.
                </p>
                <p className="text-sm text-gray-800 dark:text-white mt-2">
                    <span className="font-bold">Element Description:</span> {data.rashi_prediction.element_description},
                </p>
                <p className="text-sm text-gray-800 dark:text-white mb-2">
                    <span className="font-bold">Type Description:</span> {data.rashi_prediction.type_description},
                </p>
                {(data.planet_moves === null || data.planet_moves === undefined) ? null :
                    <>
                        <Hr className="w-full" />
                        <div className="my-2">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-3">
                                {data.name} placed at {data.planet_moves.house_id} house, and This House of {data.planet_moves.house.name}:
                            </h3>
                            <p className="text-md text-gray-800 dark:text-white my-2">
                                <span className="font-bold">Description:</span> {data.planet_moves.description},
                            </p>
                        </div>
                    </>}
                <Hr className="w-full" />
                <div className="my-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-3">
                        Rashi Prediction:
                    </h3>
                    <p className="text-sm text-gray-800 dark:text-white my-2">
                        <span className="font-bold">Attributes:</span> {data.rashi_prediction.attributes},
                    </p>
                    <p className="text-lg text-gray-800 dark:text-white my-2">
                        <span className="font-bold">Prediction:</span> {data.rashi_prediction.type_description},
                    </p>
                    <p className="text-lg text-gray-800 dark:text-white my-2">
                        <span className="font-bold">Significance:</span> {data.rashi_prediction.significance},
                    </p>
                    <p className="text-lg text-gray-800 dark:text-white my-2">
                        <span className="font-bold">Results:</span> {data.rashi_prediction.results},
                    </p>
                </div>
                {(data.planet === null || data.planet === undefined) ? null :
                    <>
                        <Hr className="w-full" />
                        <div className="my-2">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-3">
                                Planet Prediction: {data.planet.name}, Impact: {data.planet.impact},
                            </h3>
                            <p className="text-sm text-gray-800 dark:text-white my-2">
                                <span className="font-bold">Impact:</span> {data.planet.karak},
                            </p>
                            <p className="text-sm text-gray-800 dark:text-white my-2">
                                <span className="font-bold">Income Source:</span> {data.planet.karak},
                            </p>
                            <p className="text-lg text-gray-800 dark:text-white my-2">
                                <span className="font-bold">Income Process:</span> {data.planet.income},
                            </p>
                            <p className="text-lg text-gray-800 dark:text-white my-2">
                                <span className="font-bold">Significance:</span> {data.planet.significance},
                            </p>
                            <p className="text-lg text-gray-800 dark:text-white my-2">
                                <span className="font-bold">Friendly Houses:</span> {data.planet.friendly_houses},
                                <span className="font-bold"> Neutral Houses:</span> {data.planet.neutral_houses},
                                <span className="font-bold"> Unfriendly Houses:</span> {data.planet.unfriendly_houses},
                            </p>
                            <p className="text-lg text-gray-800 dark:text-white my-2">
                                <span className="font-bold">Friendly Planets:</span> {data.planet.friendly_planets},
                                <span className="font-bold"> Neutral Planets:</span> {data.planet.neutral_planets},
                                <span className="font-bold"> Unfriendly Planets:</span> {data.planet.enemy_planets},
                            </p>
                        </div>
                    </>
                }
                <Hr className="w-full" />
                <div className="my-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-3">
                        Nakshtra: {capitalizeFirstLetter(data.nakshatra_prediction.name)}, Pada: {data.nakshatra_pada} Prediction,
                    </h3>
                    <p className="text-md text-gray-800 dark:text-white my-2">
                        <span className="font-bold">{data.nakshatra_prediction.padas[data.nakshatra_pada - 1]}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

// House Moves for prediction // Its used in PlanetsInfo Component
export function HouseMovesPrediction({ ascHouseId }: { ascHouseId: number }) {
    const houseMoves = houseMovesIds(ascHouseId);
    return houseMoves && houseMoves.map((h: any, i: number) => {
        return (
            <div key={i} className="border border-gray-200 dark:border-neutral-700 p-3">
                <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-300 mt-3">
                    {h.move_id} House - When it moved {h.house_id} to {h.move_id} House
                </h3>
                <p>{h.description}</p>
            </div>
        )
    });
}

// Houses Ids generation for prediction
function houseMovesIds(asc_house_id: number) {
    // const diff = asc_house_id - 1;
    let house1 = asc_house_id;
    let house2 = 1;
    // let houses = [];
    const housesData = [];
    for (let i = 0; i < 12; i++) {
        if (house1 > 12) { house1 = 1 }
        const oHouse = house1;
        ++house1;
        let nHouse = house2;
        ++house2;
        if (nHouse > 12) { nHouse = 1 }
        housesData.push(HouseMoves.find((house: any) => {
            return (house.house_id == oHouse && house.move_id == nHouse) ? house : null;
        }));
    }
    return housesData;
}


// planets based prediction processing
function proccessData(planetInfo: any) {
    const nakshatras = Nakshatras.map((nakshatra: any) => {
        return {
            ...nakshatra,
            padas: [
                nakshatra.first_pada,
                nakshatra.second_pada,
                nakshatra.third_pada,
                nakshatra.fourth_pada
            ]
        }
    })

    // const house_moves = HouseMoves.map((house_move: any) => {
    //     return {
    //         ...house_move,
    //         house: Houses.find((house: any) => (
    //             house.id === house_move.house_id
    //                 ? house
    //                 : null
    //         ))
    //     }
    // })

    const planet_in_house = PlanetMoves.map((planet_move: any) => {
        return {
            ...planet_move,
            planet: Planets.find((planet: any) => (
                planet.id === planet_move.planet_id
                    ? planet
                    : null
            )),
            house: Houses.find((house: any) => (
                house.id === planet_move.house_id
                    ? house
                    : null
            ))
        }
    })

    let predictionInfo: any[] = [];
    if (planetInfo){
        predictionInfo = Object.keys(planetInfo).map((data: string) => (
            {
                name: data,
                current_sign: planetInfo[data]['current_sign'],
                zodiac_sign_name: planetInfo[data]['zodiac_sign_name'],
                zodiac_sign_lord: planetInfo[data]['zodiac_sign_lord'],
                nakshatra_number: planetInfo[data]['nakshatra_number'],
                nakshatra_name: planetInfo[data]['nakshatra_name'],
                nakshatra_pada: planetInfo[data]['nakshatra_pada'],
                nakshatra_vimsottari_lord: planetInfo[data]['nakshatra_vimsottari_lord'],
                house_number: planetInfo[data]['house_number'],
                fullDegree: planetInfo[data]['fullDegree'],
                normDegree: planetInfo[data]['normDegree'],
                isRetro: planetInfo[data]['isRetro'],
                planet: Planets.find((planet: any) => (
                    planet.name.toLowerCase().startsWith(data.toLowerCase())
                        ? planet
                        : null
                )),
                rashi_prediction: Rashis.find((rashi: any) => (
                    rashi.name.toLowerCase().includes((planetInfo[data]['zodiac_sign_name']).toLowerCase())
                        ? rashi
                        : null
                )),
                planet_moves: planet_in_house.find((pih: any) =>
                    pih.planet.name.toLowerCase().startsWith(data.toLowerCase()) &&
                        pih.house.id === (planetInfo[data]['house_number'] || planetInfo[data]['current_sign'])
                        ? pih
                        : null
                ),
                // house_moves: house_moves.find((house_move: any) => (
                //     house_move.house.id === (planetInfo[data]['house_number'] || planetInfo[data]['current_sign'])
                //         ? house_move
                //         : null
                // )),
                nakshatra_prediction: nakshatras.find((nakshatra: any) => (
                    nakshatra.id === planetInfo[data]['nakshatra_number']
                        ? nakshatra
                        : null
                )),
            }
        ));
    }
    return predictionInfo;
}

function capitalizeFirstLetter(string: string) {
    if (!string) return '';
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}