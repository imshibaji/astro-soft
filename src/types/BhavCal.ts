export interface BhavasInputs{
	mon?: number
	day?: number
	year?: number
	time?: {
		hour: number
		min: number
	}
	timeZone?: {
		hour: number
		min: number
	}
	longitude?: {
		deg: number
		min: number
	},
	latitude?: {
		deg: number
		min: number
	},
	DST?: boolean
	East?: boolean
	South?: boolean
}

export interface BhavaResult{
	main: ResultMain;
	bhavaMadhya: string[];
	bhavaSandhi: string[];
}

export interface ResultMain{
	julDay: number;
	ayan: string;
	asc: string;
	midHvn: string;
}