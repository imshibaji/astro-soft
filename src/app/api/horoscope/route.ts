import { AstroApiLoader } from "@/components/actions/AstroApiLoader";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.nextUrl.searchParams.get('year'));
    
    const data = await AstroApiLoader({
        year: Number(req.nextUrl.searchParams.get('year')),
        month: Number(req.nextUrl.searchParams.get('month')),
        date: Number(req.nextUrl.searchParams.get('date')),
        latitude: Number(req.nextUrl.searchParams.get('latitude')),
        longitude: Number(req.nextUrl.searchParams.get('longitude')),
        timezone: 5.5,
        settings: { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" },
        config: { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" },
    });
    return NextResponse.json(data);
}