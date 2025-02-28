import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { Response } from '../../../infrastructure/interfaces/product.responses';
import { ProductMapper } from '../../../infrastructure/mappers/product.mapper';
import type { Product } from '../../entities/product.entity';


export const listProductsUseCase = async ( fetcher: HttpAdapter  ):Promise<Product[]> => {
  
  try {

    const list = await fetcher.get<Response>('/products');
    return list.data.map(  ProductMapper.fromProductResultToEntity );
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - NowPlaying');
  }


}

