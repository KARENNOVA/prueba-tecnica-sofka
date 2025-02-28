import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './http.adapter';

interface Options {
  baseUrl: string;
  params: Record<string,string>;
}


export class AxiosAdapter implements HttpAdapter {
  
  private axiosInstance: AxiosInstance;

  constructor( options: Options ) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    })
  }

  
  async get<T>( url: string, options?: Record<string, unknown> | undefined ): Promise<T> {
    
    try {
      const { data } = await this.axiosInstance.get<T>(url, options );      
      return data;

    } catch (error) {
      throw new Error(`Error fetching get: ${ url } `);
    }

  }

  async post<T>(url: string, info: T, options?: Record<string, unknown>): Promise<T> {
    try {
      console.log('producto info', info);
      
      const { data } = await this.axiosInstance.post<T>(url, info, {
        params: options, // o headers si prefieres
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching POST: ${url}`);
    }
  }

  async put<T>(url: string, info: T, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstance.put<T>(url, info, {
        params: options,
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching PUT: ${url}`);
    }
  }

  async delete<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstance.delete<T>(url, {
        params: options,
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching DELETE: ${url}`);
    }
  }


}

