import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { ProductMapper } from "../../../infrastructure/mappers/product.mapper";
import { Product } from "../../entities/product.entity";

export const createProductUseCase = async (fetcher: HttpAdapter, product: Product): Promise<Product> => {
    try {
      const productResult = await fetcher.post<any>('/products', ProductMapper.fromProductRequest(product));
      return ProductMapper.fromProductResultToEntity(productResult);
    } catch (error) {
      console.log(error);
      throw new Error('Error creating product');
    }
  }
  