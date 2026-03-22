import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Params } from '../types/params.js';
import {
  getProductsService,
  getProductService,
  postProductService,
  putProductService,
  deleteProductService,
} from '../services/products.service.js';
import type { Product } from '../types/product.js';

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.code(200).send(getProductsService());
}

export async function getProduct(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { productId } = request.params;

  const product = getProductService(productId);

  if (!product) {
    return reply.code(404).send({
      message: 'product not found',
    });
  }

  return reply.code(200).send(product);
}

export async function postProduct(
  request: FastifyRequest<{ Body: Omit<Product, 'id'> }>,
  reply: FastifyReply,
) {
  const product = postProductService(request.body);
  return reply.code(201).send(product);
}

export async function putProduct(
  request: FastifyRequest<{ Body: Product; Params: Params }>,
  reply: FastifyReply,
) {
  const product = putProductService(request.params.productId, request.body);
  if (!product) {
    return reply.code(404).send({
      message: 'product not found',
    });
  }
  return reply.code(200).send(product);
}

export async function deleteProduct(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { productId } = request.params;
  const isDeleted = deleteProductService(productId);

  if (!isDeleted) {
    return reply.code(404).send({
      message: 'product not found',
    });
  }
  return reply.code(204).send();
}
