import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { ProductMapper } from "../../../infrastructure/mappers/product.mapper";
import { Product } from "../../entities/product.entity";

export const getProductByIdUseCase = async (fetcher: HttpAdapter, productId: string): Promise<Product> => {
  try {
    console.log('id que llega', productId);
    
    const product = await fetcher.get<any>(`/products/${productId}`);
    return ProductMapper.fromProductResultToEntity(product);
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching product with id ${productId}`);
  }
}
