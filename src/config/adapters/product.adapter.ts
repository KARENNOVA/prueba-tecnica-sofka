import { AxiosAdapter } from './http/axios.adapter';


export const productFetcher = new AxiosAdapter({
  baseUrl: 'http://10.0.2.2:3002/bp',
  params: {
    api_key: '9d6a90c2b95d4a700ee5cb9705c94b0f',
    language: 'es'
  }
});