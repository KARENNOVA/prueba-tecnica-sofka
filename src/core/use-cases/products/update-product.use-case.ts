import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { ProductMapper } from "../../../infrastructure/mappers/product.mapper";
import { Product } from "../../entities/product.entity";

export const updateProductUseCase = async (fetcher: HttpAdapter, productId: string, product: Product): Promise<Product> => {
    try {
      const productResult = await fetcher.put<any>(`/products/${productId}`, ProductMapper.fromProductRequest(product));
      return ProductMapper.fromProductResultToEntity(productResult);
    } catch (error) {
      console.log(error);
      throw new Error(`Error updating product with id ${productId}`);
    }
  }
  