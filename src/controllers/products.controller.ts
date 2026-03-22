import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Params } from '../types/params.js';
import {
  getAllProducts,
  getProductById,
} from '../services/products.service.js';

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

  const product = getProductById(productId);

  if (!product) {
    return reply.code(404).send({
      message: 'product not found',
    });
  }

  return reply.code(200).send(product);
}

export async function postProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.code(201).send(request.body);
}
