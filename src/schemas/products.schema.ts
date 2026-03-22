export const productsSchema = {
  params: {
    type: 'object',
    properties: {},
    required: [],
  },
};

export const productIdSchema = {
  params: {
    type: 'object',
    properties: {
      productId: { type: 'string', format: 'uuid' },
    },
    required: ['productId'],
  },
};

export const productBodySchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0 },
      category: { type: 'string' },
      inStock: { type: 'boolean' },
    },
    required: ['name', 'description', 'price', 'category', 'inStock'],
  },
};
