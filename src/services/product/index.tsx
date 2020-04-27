// Mock data
import products, { Product } from 'data/products';

type getProductsType = { products: Product[]; productsTotal: number };

export const getProducts = (limit: number = 6): Promise<getProductsType> => {
  return new Promise<getProductsType>(resolve => {
    setTimeout(() => {
      resolve({
        products: products.slice(0, limit),
        productsTotal: products.length
      });
    }, 700);
  });
};
