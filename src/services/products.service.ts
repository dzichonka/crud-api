import { products } from '../db/memory.js';
import type { Product } from '../types/product.js';
import crypto from 'node:crypto';

export function getProductsService() {
  //throw new Error('500'); // for testing 500
  return products;
}

export function getProductService(id: string) {
  return products.find((product) => product.id === id);
}

export function postProductService(product: Omit<Product, 'id'>) {
  const id = crypto.randomUUID();
  const newProduct = { ...product, id };
  products.push(newProduct);
  return newProduct;
}

export function putProductService(id: string, data: Omit<Product, 'id'>) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return null;
  }
  const updatedProduct: Product = {
    id,
    ...data,
  };
  products[index] = updatedProduct;
  return updatedProduct;
}

export function deleteProductService(id: string) {
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    return true;
  }
}
