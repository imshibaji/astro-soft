import { ApiInputs } from "@/types/AstroApi";

export default class AstroApiSvgCode {
    url = process.env.API_URL;
    key = process.env.API_KEY || 'api-key';
    async horoscopeChart(inputs: ApiInputs) {
        const response = await fetch(this.url+'/horoscope-chart-svg-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': this.key
            },
            body: JSON.stringify(inputs),
          });
          const data = await response.json();
          return data;
    }
    async navamsaChart(inputs: ApiInputs) {
        const response = await fetch(this.url+'/navamsa-chart-svg-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': this.key
            },
            body: JSON.stringify(inputs),
          });
          const data = await response.json();
          return data;
    }

}