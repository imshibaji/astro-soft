'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import AstroApi from "@/providers/AstroApi";
import AstroApiSvgCode from "@/providers/AstroApiSvgCode";
import { ApiInputsData } from "@/utils/AstroApi";

export async function AstroApiLoader(inputsData: ApiInputsData) {
    const astroChart = new AstroApiSvgCode();
    const hcData = await astroChart.horoscopeChart(inputsData);
    const ncData = await astroChart.navamsaChart(inputsData);
    const astroApi = new AstroApi();
    const infoData = await astroApi.horoscopeInfo(inputsData) as any;
    return {
        hcData,
        ncData,
        infoData
    };
}