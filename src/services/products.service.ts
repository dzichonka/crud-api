import { products } from '../db/memory.js';

export function getAllProducts() {
  return products;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
