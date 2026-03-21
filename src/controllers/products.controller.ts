import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Params } from '../types/params.js';
import {
  getAllProducts,
  getProductById,
} from '../services/products.service.js';
import { validate as isUuid } from 'uuid';

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.code(200).send(getAllProducts());
}

export async function getProduct(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { productId } = request.params;

  if (!isUuid(productId)) {
    return reply.code(400).send({
      message: 'Invalid productId',
    });
  }

  const product = getProductById(productId);

  if (!product) {
    return reply.code(404).send({
      message: 'Product not found',
    });
  }

  return reply.code(200).send(product);
}
