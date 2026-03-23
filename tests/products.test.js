import { describe, it, expect, beforeEach } from 'vitest';
import Fastify from 'fastify';

import { productRoutes } from '../src/routes/products.js';

describe('Products API', () => {
  let app;

  beforeEach(async () => {
    app = Fastify();
    app.register(productRoutes, { prefix: '/api' });
    await app.ready();
  });

  describe('GET /api/products', () => {
    it('should return empty array', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/products',
      });

      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.payload)).toHaveLength(2);
    });
  });

  describe('POST /api/products', () => {
    it('should create product', async () => {
      const newProduct = {
        name: 'Laptop',
        description: 'Gaming laptop',
        price: 1500,
        category: 'electronics',
        inStock: true,
      };

      const res = await app.inject({
        method: 'POST',
        url: '/api/products',
        payload: newProduct,
      });

      expect(res.statusCode).toBe(201);

      const product = JSON.parse(res.payload);
      expect(product).toMatchObject(newProduct);
      expect(product).toHaveProperty('id');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return product by id', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/products',
        payload: {
          name: 'Phone',
          description: 'Smartphone',
          price: 800,
          category: 'electronics',
          inStock: true,
        },
      });

      const created = JSON.parse(createRes.payload);

      const res = await app.inject({
        method: 'GET',
        url: `/api/products/${created.id}`,
      });

      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.payload)).toEqual(created);
    });

    it('should return 404 if product not found', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/products/123e4567-e89b-12d3-a456-426614174000',
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/products',
        payload: {
          name: 'Tablet',
          description: 'Tablet device',
          price: 500,
          category: 'electronics',
          inStock: true,
        },
      });

      const created = JSON.parse(createRes.payload);

      const res = await app.inject({
        method: 'PUT',
        url: `/api/products/${created.id}`,
        payload: {
          ...created,
          name: 'Tablet Pro',
          price: 700,
        },
      });

      expect(res.statusCode).toBe(200);

      const updated = JSON.parse(res.payload);
      expect(updated.name).toBe('Tablet Pro');
      expect(updated.price).toBe(700);
    });

    it('should return 404 for non-existing product', async () => {
      const res = await app.inject({
        method: 'PUT',
        url: '/api/products/123e4567-e89b-12d3-a456-426614174000',
        payload: {
          name: 'Test',
          description: 'Test',
          price: 100,
          category: 'test',
          inStock: true,
        },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/products',
        payload: {
          name: 'Camera',
          description: 'DSLR',
          price: 1200,
          category: 'electronics',
          inStock: true,
        },
      });

      const created = JSON.parse(createRes.payload);

      const res = await app.inject({
        method: 'DELETE',
        url: `/api/products/${created.id}`,
      });

      expect(res.statusCode).toBe(204);
    });

    it('should return 404 if product not found', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/api/products/123e4567-e89b-12d3-a456-426614174000',
      });

      expect(res.statusCode).toBe(404);
    });
  });
});
