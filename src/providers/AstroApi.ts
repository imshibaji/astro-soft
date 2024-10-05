import { ApiInputs } from "@/types/AstroApi";

export default class AstroApi {
    url = process.env.API_URL;
    key = process.env.API_KEY || 'api-key';

    async horoscopeInfo(inputs: ApiInputs) {        
        const response = await fetch(this.url+'/planets/extended', {
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

    async navamsaInfo(inputs: ApiInputs) {
        const response = await fetch(this.url+'/navamsa-chart-info', {
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