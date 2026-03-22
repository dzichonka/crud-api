export const getProductsSchema = {
  params: {
    type: 'object',
    properties: {},
    required: [],
  },
};

export const getProductSchema = {
  params: {
    type: 'object',
    properties: {
      productId: { type: 'string', format: 'uuid' },
    },
    required: ['productId'],
  },
};

export const postProductSchema = {
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
