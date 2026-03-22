import { products } from '../db/memory.js';
import type { Product } from '../types/product.js';

export function getAllProducts() {
  return products;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function postProduct(product: Product) {
  products.push(product);
  return product;
}
