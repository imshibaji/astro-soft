export interface ApiInputs {
    year?: number
    month?: number
    date?: number
    hours?: number
    minutes?: number
    seconds?: number
    latitude?: number
    longitude?: number
    timezone?: number
    settings?: Config
    config?: Config
    chart_config?: ChartConfig
  }
  
  export interface Config {
    observation_point?: string
    ayanamsha?: string
    language?: string
  }
  
  export interface ChartConfig {
    font_family?: string
    hide_time_location?: string
    hide_outer_planets?: string
    chart_style?: string
    sign_number_font_color?: string
    native_name?: string
    native_name_font_size?: string
    native_details_font_size?: string
    chart_border_width?: number
    planet_name_font_size?: string
    chart_heading_font_size?: string
    chart_background_color?: string
    chart_border_color?: string
    native_details_font_color?: string
    native_name_font_color?: string
    planet_name_font_color?: string
    chart_heading_font_color?: string
  }

  export interface AstroApiResponse {
    inputs: ApiInputs,
    output: string | AstroInfoResponse,
    status: string,
    message: string,
    chart1: string,
    chart2: string,
    data: {
      horoscope: string,
      navamsa: string,
      planets: AstroInfoResponse
    }
  }
  export interface AstroInfoResponse {
    Ascendant: PlanetInfo
    Sun: PlanetInfo
    Moon: PlanetInfo
    Mars: PlanetInfo
    Mercury: PlanetInfo
    Jupiter: PlanetInfo
    Venus: PlanetInfo
    Saturn: PlanetInfo
    Rahu: PlanetInfo
    Ketu: PlanetInfo
    Uranus: PlanetInfo
    Neptune: PlanetInfo
    Pluto: PlanetInfo
  }
  
  export interface PlanetInfo {
    current_sign: number
    house_number?: number
    fullDegree: number
    normDegree: number
    isRetro: string
    zodiac_sign_name: string
    zodiac_sign_lord: string
    nakshatra_number: number
    nakshatra_name: string
    nakshatra_pada: number
    nakshatra_vimsottari_lord: string
  }