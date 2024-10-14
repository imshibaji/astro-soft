import { AstroApiLoader } from "@/components/actions/AstroApiLoader";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.nextUrl.searchParams.get('year'));
    
    const data = await AstroApiLoader({
        year: Number(req.nextUrl.searchParams.get('year')),
        month: Number(req.nextUrl.searchParams.get('month')),
        date: Number(req.nextUrl.searchParams.get('date')),
        hours: Number(req.nextUrl.searchParams.get('hours')),
        minutes: Number(req.nextUrl.searchParams.get('minutes')),
        latitude: Number(req.nextUrl.searchParams.get('latitude')),
        longitude: Number(req.nextUrl.searchParams.get('longitude')),
        timezone: Number(req.nextUrl.searchParams.get('timezone') || 5.5),
        settings: { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" },
        config: { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" },
        chart_config: { 
            native_name:"Mr. Ram Charan", 
            native_name_font_size: "20px", 
            native_details_font_size:"15px",
            font_family:"Mallanna", /* Mallanna / Roboto */
            hide_time_location:"False", /* True / False */
            hide_outer_planets:"False", /* True / False */
            chart_style:"north_india",  /* south_india / north_india */
            sign_number_font_color:"#A5243D", /* works for north_india chart only */
            chart_border_width:1,
            planet_name_font_size: "20px",
            chart_heading_font_size:"25px",            
            chart_background_color:"#FEE1C7",            
            chart_border_color:"#B5A886",            
            native_details_font_color:"#000",            
            native_name_font_color: "#231F20",            
            planet_name_font_color: "#BC412B",            
            chart_heading_font_color:"#2D3319"
        }
    });
    return NextResponse.json(data);
}