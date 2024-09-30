/* eslint-disable @typescript-eslint/no-explicit-any */
import {pi, floor, sin, cos, tan, atan2, abs} from "mathjs";


// build string with degrees, minutes, seconds and zodiac sign from longitude
const zn = "AriTauGemCanLeoVirLibScoSagCapAquPis";  // Zodiac 
const d2r = pi/180;	// degrees to radians
const r2d = 180/pi;	// radians to degrees
const range = [1,12,1,31,1800,2100,0,23,0,59,0,12,0,59,0,0,0,179,0,59,0,0,0,89,0,59]; 	

export function checkEntries(f:any){
    let msg = "";
	for(let i = 0; i < 13; i++){
		const e = f.elements[i];
		if((e.name == "DST") || (e.name == "East") || (e.name == "South"))continue;
		if(isNaN(e.value) || (e.value < range[i*2] ) || ( e.value > range[i*2+1])){
			msg = "Please enter value between " 
				+ range[i*2] + " and " + range[i*2+1] 
				+ " in the " + e.name + " field";
			alert(msg);
			return true;
		}
	}
	return false;
}

export function calculate({
        mon = 0,
        day = 0,
        year = 0,
        hour = 0,
        timeZone = 0,
        longitude = 0,
        latitude = 0,
		DST = false,
		East = false,
		South = false
})
{
	// if(checkEntries(document.BhavaCalc))return;
	
	mon = floor(mon);
	day = floor(day);
	year= floor(year);

	// hr is in 0.5 hour increments
	let hr= floor(hour);
	hr	+= floor(hr)/60;

	// timeZone is in 0.5 hour increments
	let tz= floor(timeZone);
	tz += floor(tz)/60;

	// longitude is in 0.5 degree increments
	let ln= floor(longitude);
	ln += floor(ln)/60;

	// latitude is in 0.5 degree increments
	let la= floor(latitude);
	la += floor(la)/60;

	// checks for checked DST, East, South	
	if(East)ln = -ln;
	if(South)la = -la;
	if(DST){
		if(ln < 0.0)tz++;
		else tz--;
	}

	const jd = mdy2julian(mon,day,year);
    let mc,f;
	if(ln < 0.0)f = hr - tz;
	else f = hr+tz;
	
	const t = ((jd - 2415020) + f/24 - 0.5)/36525;
	const ay = calcAyanamsa(t);

	const ra = (((6.6460656 + 2400.0513 * t + 2.58e-5 * t * t + f) * 15 - ln) % 360) * d2r; // RAMC
	const ob = (23.452294 - 0.0130125 * t) * d2r; // Obliquity of Ecliptic
    
	// Calculate Midheaven
	mc = atan2(tan(ra),cos(ob));
	if(mc < 0.0)mc += pi;
	if(sin(ra) < 0.0)mc += pi
	mc *= r2d;
		
	// Calculate Ascendant
	let as = 0.0;
	as = atan2(cos(ra),-sin(ra)*cos(ob)-tan(la * d2r)*sin(ob));
	if(as < 0.0)as += pi;
	if(cos(ra) < 0.0)as += pi;
	as *= r2d % 360.0;
	// add Ayanamsa
	as += ay; mc += ay;

	// calculate bhavas as per 
	// Deepak Kapoor's "Astronomy and Mathematical Astrology" - 1997 Ranjan Pub.
	const hs = new Array(24);
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

	const main = {
		julDay: jd,
		ayan: writedms(ay),
		asc: lon2dmsz(as),
		midHvn: lon2dmsz(mc),
	}
	// Fill Out Madhya Values in Form
	const bhavaMadhya = { Mad1: lon2dmsz(hs[0]),
		Mad2: lon2dmsz(hs[2]),
		Mad3: lon2dmsz(hs[4]),
		Mad4: lon2dmsz(hs[6]),
		Mad5: lon2dmsz(hs[8]),
		Mad6: lon2dmsz(hs[10]),
		Mad7: lon2dmsz(hs[12]),
		Mad8: lon2dmsz(hs[14]),
		Mad9: lon2dmsz(hs[16]),
		Mad10: lon2dmsz(hs[18]),
		Mad11: lon2dmsz(hs[20]),
		Mad12: lon2dmsz(hs[22]),
	};

	// Fill Out Madhya Values in Form
	const bhavaSandhi = {
		snd1: lon2dmsz(hs[1]),
		snd2: lon2dmsz(hs[3]),
		snd3: lon2dmsz(hs[5]),
		snd4: lon2dmsz(hs[7]),
		snd5: lon2dmsz(hs[9]),
		snd6: lon2dmsz(hs[11]),
		snd7: lon2dmsz(hs[13]),
		snd8: lon2dmsz(hs[15]),
		snd9: lon2dmsz(hs[17]),
		snd10: lon2dmsz(hs[19]),
		snd11: lon2dmsz(hs[21]),
		snd12: lon2dmsz(hs[23]),
	};
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
	let j = (2 * (im - floor(im/12) * 12) + 7 + 365 * im)/12;
	j = floor(j) + d + floor(im/48) - 32083;
	if(j > 2299171)j += floor(im/4800) - floor(im/1200) + 38;
	return j;
}

// build string with degrees, minutes, seconds and zodiac sign from longitude
export function lon2dmsz(x:number)
{
    let str = "";
	let z = 0;
	let d,m,s;
	x = abs(x);
	d = floor(x);
	m = (x - d);
	s = m * 60;
	m = floor(s);
	s = s - m;
	z = floor(d/30);
	d %= 30;
	str = d + "° " + m + "' " + floor(s * 60) + "\" " + zn.substr(z*3,3);
	return str;
}

// write degrees minutes
export function writedms(x:number) {
    let sgn = 1;
    let str = "";
	if(x < 0.0)sgn = -1;
	else sgn = 1;
	x = abs(x);

	const d = floor(x);
	let m,s;
	m = (x - d);
	s = m * 60;
	m = floor(s);
	s = s - m;
	str =  (d*sgn) + "° " + m + "' " + floor(s * 60) + "\"";
	return str;
}

// keep within 360 degrees
export function fix360(v:number)
{
	if(v < 0.0)v += 360;
	if(v > 360)v -= 360;
	return v;
}