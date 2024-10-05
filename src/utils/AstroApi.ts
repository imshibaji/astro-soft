import { ApiInputs, ChartConfig, Config } from "@/types/AstroApi";


export class ApiInputsData implements ApiInputs {
    year?: number;
    month?: number;
    date?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    latitude?: number;
    longitude?: number;
    timezone?: number;
    settings?: Config;
    config?: Config;
    chart_config?: ChartConfig;

    constructor(apiInputs?: ApiInputs) {
        this.year = apiInputs!.year || 1986;
        this.month = apiInputs!.month || 11;
        this.date = apiInputs!.date || 10;
        this.hours = apiInputs!.hours || 20;
        this.minutes = apiInputs!.minutes || 5;
        this.seconds = apiInputs!.seconds || 0;
        this.latitude = apiInputs!.latitude || 22;
        this.longitude = apiInputs!.longitude || 88;
        this.timezone = apiInputs!.timezone || 5;
        this.settings = new ConfigData(apiInputs!.settings || { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" });
        this.config = new ConfigData(apiInputs!.config || { observation_point: "geocentric", ayanamsha: "lahiri", language: "en" });
        this.chart_config = new ChartConfigData(apiInputs!.chart_config || {
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
        });
    }
}

export class ConfigData implements Config {
    observation_point: string;
    ayanamsha: string;
    language: string;

    constructor(config: Config) {
        this.observation_point = config.observation_point!;
        this.ayanamsha = config.ayanamsha!;
        this.language = config.language!;
    }
}

export class ChartConfigData implements ChartConfig {
    font_family: string;
    hide_time_location: string;
    hide_outer_planets: string;
    chart_style: string;
    sign_number_font_color: string;
    native_name: string;
    native_name_font_size: string;
    native_details_font_size: string;
    chart_border_width: number;
    planet_name_font_size: string;
    chart_heading_font_size: string;
    chart_background_color: string;
    chart_border_color: string;
    native_details_font_color: string;
    native_name_font_color: string;
    planet_name_font_color: string;
    chart_heading_font_color: string;

    constructor(chartConfig: ChartConfig) {
        this.font_family = chartConfig.font_family!;
        this.hide_time_location = chartConfig.hide_time_location!;
        this.hide_outer_planets = chartConfig.hide_outer_planets!;
        this.chart_style = chartConfig.chart_style!;
        this.sign_number_font_color = chartConfig.sign_number_font_color!;
        this.native_name = chartConfig.native_name!;
        this.native_name_font_size = chartConfig.native_name_font_size!;
        this.native_details_font_size = chartConfig.native_details_font_size!;
        this.chart_border_width = chartConfig.chart_border_width!;
        this.planet_name_font_size = chartConfig.planet_name_font_size!;
        this.chart_heading_font_size = chartConfig.chart_heading_font_size!;
        this.chart_background_color = chartConfig.chart_background_color!;
        this.chart_border_color = chartConfig.chart_border_color!;
        this.native_details_font_color = chartConfig.native_details_font_color!;
        this.native_name_font_color = chartConfig.native_name_font_color!;
        this.planet_name_font_color = chartConfig.planet_name_font_color!;
        this.chart_heading_font_color = chartConfig.chart_heading_font_color!;
    }    
}