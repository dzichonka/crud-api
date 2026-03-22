import type { Product } from '../types/product.js';

export const products: Product[] = [
  {
    id: '5272f6bb-cbf9-41a3-83fc-5a57606250a0',
    name: 'Invisible Umbrella',
    description: 'Keeps you dry… but only in alternate dimensions.',
    price: 250,
    category: 'weird-inventions',
    inStock: false,
  },
  {
    id: 'f5172192-dc79-44a5-8bf3-bf7b97144623',
    name: 'Pet Rock 2.0',
    description: 'Now with Bluetooth and existential anxiety.',
    price: 42,
    category: 'quantum-pets',
    inStock: true,
  },
];
