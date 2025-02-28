import { HttpAdapter } from "../../../config/adapters/http/http.adapter";

export const deleteProductUseCase = async (fetcher: HttpAdapter, productId: string): Promise<void> => {
    try {
      await fetcher.delete(`/products/${productId}`);
    } catch (error) {
      console.log(error);
      throw new Error(`Error deleting product with id ${productId}`);
    }
  }
  