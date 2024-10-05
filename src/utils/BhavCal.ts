import { BhavaResult, BhavasInputs } from "@/types/BhavCal";
// import {pi, floor, sin, cos, tan, atan2, abs,} from "mathjs";


// build string with degrees, minutes, seconds and zodiac sign from longitude
const zn = "AriTauGemCanLeoVirLibScoSagCapAquPis";  // Zodiac 
const d2r = Math.PI/180;	// degrees to radians
const r2d = 180/Math.PI;	// radians to degrees


export function calculate({
        mon = 0,
        day = 0,
        year = 0,
		time = {
			hour: 0,
			min: 0
		},
        timeZone = {
			hour: 0,
			min: 0
		},
		longitude={
			deg: 0,
			min: 0
		},
        latitude = {
			deg: 0,
			min: 0
		},
		DST = false,
		East = false,
		South = false
}: BhavasInputs): BhavaResult
{	
	// mon, day, year are integers	
	mon = Math.floor(mon);
	day = Math.floor(day);
	year= Math.floor(year);

	// hr is in 0.5 hour increments
	let hr= Math.floor(time.hour);
	hr	+= Math.floor(time.min)/60;

	// timeZone is in 0.5 hour increments
	let tz= Math.floor(timeZone.hour);
	tz += Math.floor(timeZone.min)/60;

	// longitude is in 0.5 degree increments
	let ln= Math.floor(longitude.deg);
	ln += Math.floor(latitude.min)/60;

	// latitude is in 0.5 degree increments
	let la= Math.floor(latitude.deg);
	la += Math.floor(latitude.min)/60;

	// checks for checked DST, East, South
	const dst = DST;
	const eln = East;
	const sla = South;
	if(eln)ln = -ln;
	if(sla)la = -la;
	if(dst){
		if(ln < 0.0)tz++;
		else tz--;
	}

	const jd = mdy2julian(mon,day,year);
    let f = 0.0;
	if(ln < 0.0)f = hr - tz;
	else f = hr+tz;
	
	const t = ((jd - 2415020) + f/24 - 0.5)/36525;
	const ay = calcAyanamsa(t);
	const jdAy = { julDay: jd, ayan: writedms(ay)}

	const ra = (((6.6460656 + 2400.0513 * t + 2.58e-5 * t * t + f) * 15 - ln) % 360) * d2r; // RAMC
	const ob = (23.452294 - 0.0130125 * t) * d2r; // Obliquity of Ecliptic
    
	// Calculate Midheaven
	let mc = 0.0;
	mc = Math.atan2(Math.tan(ra),Math.cos(ob));
	if(mc < 0.0)mc += Math.PI;
	if(Math.sin(ra) < 0.0)mc += Math.PI;
	mc *= r2d;
		
	// Calculate Ascendant
	let as = 0.0;
	as = Math.atan2(Math.cos(ra),-Math.sin(ra)*Math.cos(ob)-Math.tan(la * d2r)*Math.sin(ob));
	if(as < 0.0)as += Math.PI;
	if(Math.cos(ra) < 0.0)as += Math.PI;
	as *= r2d % 360.0;
	// add Ayanamsa
	as += ay; mc += ay;
	const main = {
		...jdAy,
		asc: lon2dmsz(as),
		midHvn: lon2dmsz(mc),
	}

	// calculate bhavas as per 
	// Deepak Kapoor's "Astronomy and Mathematical Astrology" - 1997 Ranjan Pub.
	const hs: number[] = new Array(24);
	let x = as - mc;
	if(x < 0.0)x += 360.0;
	x /= 6;
	let y = 18; // 10th house in the array
	for(let i = 0; i < 7; i++){
		hs[y] = mc + x * i;
		y++;
		if(y > 24)y = 0; 
	}  		
	x = mc - fix360(as + 180.0);
	if(x < 0.0)x += 360.0;
	x /= 6;
	y = 12;
	for(let i = 0; i < 7; i++){
		hs[y] = fix360(as + 180 + x * i);
		y++;
	}

	for(let i = 0; i < 12; i++){
		hs[i] = fix360(hs[i+12] + 180);
	}

	// Fill Out Madhya Values in Form
	const bhavaMadhya = [
		lon2dmsz(hs[0]),
		lon2dmsz(hs[2]),
		lon2dmsz(hs[4]),
		lon2dmsz(hs[6]),
		lon2dmsz(hs[8]),
		lon2dmsz(hs[10]),
		lon2dmsz(hs[12]),
		lon2dmsz(hs[14]),
		lon2dmsz(hs[16]),
		lon2dmsz(hs[18]),
		lon2dmsz(hs[20]),
		lon2dmsz(hs[22]),
	];
	// Fill Out Madhya Values in Form
	const bhavaSandhi = [
		lon2dmsz(hs[1]),
		lon2dmsz(hs[3]),
		lon2dmsz(hs[5]),
		lon2dmsz(hs[7]),
		lon2dmsz(hs[9]),
		lon2dmsz(hs[11]),
		lon2dmsz(hs[13]),
		lon2dmsz(hs[15]),
		lon2dmsz(hs[17]),
		lon2dmsz(hs[19]),
		lon2dmsz(hs[21]),
		lon2dmsz(hs[23]),
	];
	return {main, bhavaMadhya, bhavaSandhi};
}

// Calculate the Lahiri Ayanamsa by using Erlewine Fagan-Bradley sidereal calculation
// with correction using Lahiri 1900 value in minutes (see below)
export function calcAyanamsa(t:number)
{
	const ln = ((933060-6962911*t+7.5*t*t)/3600.0) % 360.0;  /* Mean lunar node */
	let Off = (259205536.0*t+2013816.0)/3600.0;             /* Mean Sun        */
	Off = 17.23*Math.sin(d2r * ln)+1.27*Math.sin(d2r * Off)-(5025.64+1.11*t)*t;
	Off = (Off- 80861.27)/3600.0;  // 84038.27 = Fagan-Bradley 80861.27 = Lahiri
	return Off;
}

// calculate Julian Day from Month, Day and Year
export function mdy2julian(d:number, m:number,y:number)
{
	
	const im = 12 * (y + 4800) + m - 3;
	let j = (2 * (im - Math.floor(im/12) * 12) + 7 + 365 * im)/12;
	j = Math.floor(j) + d + Math.floor(im/48) - 32083;
	if(j > 2299171)j += Math.floor(im/4800) - Math.floor(im/1200) + 38;
	return j;
}

// build string with degrees, minutes, seconds and zodiac sign from longitude
export function lon2dmsz(x:number)
{
    let str = "";
	let z = 0;
	let d,m,s;
	x = Math.abs(x);
	d = Math.floor(x);
	m = (x - d);
	s = m * 60;
	m = Math.floor(s);
	s = s - m;
	z = Math.floor(d/30);
	d %= 30;
	str = d + "° " + m + "' " + Math.floor(s * 60) + "\" " + zn.substr(z*3,3);
	return str;
}

// write degrees minutes
export function writedms(x:number) {
    let sgn = 1;
    let str = "";
	if(x < 0.0)sgn = -1;
	else sgn = 1;
	x = Math.abs(x);

	const d = Math.floor(x);
	let m,s;
	m = (x - d);
	s = m * 60;
	m = Math.floor(s);
	s = s - m;
	str =  (d*sgn) + "° " + m + "' " + Math.floor(s * 60) + "\"";
	return str;
}

// keep within 360 degrees
export function fix360(v:number)
{
	if(v < 0.0)v += 360;
	if(v > 360)v -= 360;
	return v;
}