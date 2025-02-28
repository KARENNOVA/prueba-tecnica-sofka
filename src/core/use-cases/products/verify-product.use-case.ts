import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
;

export const getVerifyProductUseCase = async (fetcher: HttpAdapter, productId: string): Promise<boolean> => {
  try {    
    const exist = await fetcher.get<any>(`/products/verification/${productId}`);
    return exist
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching product with id ${productId}`);
  }
}
