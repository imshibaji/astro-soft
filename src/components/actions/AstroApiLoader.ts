'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import AstroApi from "@/providers/AstroApi";
import AstroApiSvgCode from "@/providers/AstroApiSvgCode";
import { AstroApiResponse, AstroInfoResponse } from "@/types/AstroApi";
import { ApiInputsData } from "@/utils/AstroApi";

export async function AstroApiLoader(inputsData: ApiInputsData) {
    const astroChart = new AstroApiSvgCode();
    const hcData = await astroChart.horoscopeChart(inputsData) as AstroApiResponse;
    const ncData = await astroChart.navamsaChart(inputsData) as AstroApiResponse;
    const astroApi = new AstroApi();
    const infoData = await astroApi.horoscopeInfo(inputsData) as AstroApiResponse;
    const planetsInfo = infoData.output as AstroInfoResponse;
    return {
        horoscopeSvgChartData: hcData,
        navamsaSvgChartData: ncData,
        horoscopeInfoData: planetsInfo
    };
}