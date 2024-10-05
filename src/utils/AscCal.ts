export type BirthDetails = {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    latitude: number;
    longitude: number;
};
  
export type PlanetData = {
    [planet: string]: { degree: number; rashi: string };
};

// Planet data
// export const planetsDatas: PlanetData = {
//     Su: { degree: 150, rashi: "Vi" }, // Sun
//     Mo: { degree: 85, rashi: "Ca" },  // Moon
//     Ma: { degree: 210, rashi: "Sc" }, // Mars
//     Me: { degree: 120, rashi: "Le" }, // Mercury
//     Ju: { degree: 60, rashi: "Ta" },  // Jupiter
//     Ve: { degree: 30, rashi: "Ar" },  // Venus
//     Sa: { degree: 300, rashi: "Aq" }, // Saturn
//     Ra: { degree: 195, rashi: "Li" }, // Rahu
//     Ke: { degree: 15, rashi: "Pi" }   // Ketu
// };
  
// Zodiac signs
// export const signs = [
//     "Aries", "Taurus", "Gemini", "Cancer",
//     "Leo", "Virgo", "Libra", "Scorpio",
//     "Sagittarius", "Capricorn", "Aquarius", "Pisces"
// ];
export const signs = [
    "Ar", "Ta", "Ge", "Ca",
    "Le", "Vi", "Li", "Sc",
    "Sa", "Cp", "Aq", "Pi"
];

// Helper functions to calculate the ascendant
export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;
export const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI;

export function calculateJulianDate (
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number
  ): number {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
  
    const julianDay =
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      day +
      B -
      1524.5;
  
    const dayFraction = (hours + minutes / 60) / 24;
  
    return julianDay + dayFraction;
  };
  
export function calculateGST (julianDate: number): number {
    const JD2000 = 2451545.0; // Julian Date for J2000.0 epoch
    const T = (julianDate - JD2000) / 36525.0;
  
    let GST =
      280.46061837 +
      360.98564736629 * (julianDate - JD2000) +
      0.000387933 * T ** 2 -
      T ** 3 / 38710000;
  
    GST = GST % 360;
    if (GST < 0) GST += 360;
  
    return GST;
  };
  
export function calculateLST (GST: number, longitude: number): number {
    let LST = GST + longitude;
    LST = LST % 360;
    if (LST < 0) LST += 360;
  
    return LST;
}
  
export function calculateAscendant (birth: BirthDetails): string {
    const { year, month, day, hours, minutes, latitude, longitude } = birth;
  
    // Step 1: Calculate Julian Date
    const julianDate = calculateJulianDate(year, month, day, hours, minutes);
  
    // Step 2: Calculate Greenwich Sidereal Time (GST)
    const GST = calculateGST(julianDate);
  
    // Step 3: Calculate Local Sidereal Time (LST)
    const LST = calculateLST(GST, longitude);
  
    // Step 4: Calculate the Ascendant in degrees
    const ascendantRadians = Math.atan2(
      Math.sin(degreesToRadians(LST)),
      Math.cos(degreesToRadians(LST)) * Math.sin(degreesToRadians(latitude))
    );
  
    let ascendantDegree = radiansToDegrees(ascendantRadians);
    if (ascendantDegree < 0) ascendantDegree += 360;
  
    // Step 5: Determine the Ascendant Sign
    const ascendantSignIndex = Math.floor(ascendantDegree / 30);
  
    return signs[ascendantSignIndex]; // Returns the Ascendant sign
}