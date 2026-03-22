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
import { logError, logSuccess } from '../utils/logger.js';

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  reply.code(200);
  logSuccess(
    `Status: ${reply.statusCode}. All products `,
    getProductsService(),
  );
  return reply.send(getProductsService());
}

export async function getProduct(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { productId } = request.params;
  const product = getProductService(productId);

  if (!product) {
    reply.code(404);
    logError(`Product with id ${productId} not found`);
    return reply.send({
      message: 'product not found',
    });
  }
  reply.code(200);
  logSuccess(
    `Status: ${reply.statusCode}. Product with id ${productId}`,
    product,
  );
  return reply.send(product);
}

export async function postProduct(
  request: FastifyRequest<{ Body: Omit<Product, 'id'> }>,
  reply: FastifyReply,
) {
  const product = postProductService(request.body);

  reply.code(201);
  logSuccess(`Status: ${reply.statusCode}. Created new product`, product);
  return reply.send(product);
}

export async function putProduct(
  request: FastifyRequest<{ Body: Product; Params: Params }>,
  reply: FastifyReply,
) {
  const product = putProductService(request.params.productId, request.body);
  if (!product) {
    reply.code(404);
    logError(`Product with id ${request.params.productId} not found`);
    return reply.send({
      message: 'product not found',
    });
  }
  reply.code(200);
  logSuccess(`Status: ${reply.statusCode}`, product);
  return reply.send(product);
}

export async function deleteProduct(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { productId } = request.params;
  const isDeleted = deleteProductService(productId);

  if (!isDeleted) {
    reply.code(404);
    logError(`Product with id ${productId} not found`);
    return reply.send({
      message: 'product not found',
    });
  }
  reply.code(204);
  logSuccess(`Status: ${reply.statusCode}. Product deleted successfully`);
  return reply.send();
}
