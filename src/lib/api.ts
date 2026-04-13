import { Product } from '@/context/CartContext';

const BASE_URL = 'https://sampanna-iota.vercel.app';

interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
}

interface ProductsResponse {
  data: ApiProduct[];
}

interface CreateOrderPayload {
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  cartItems: Array<{
    product: string;
    price: number;
    variations: Array<{
      quantity: number;
      size: string;
      color: string;
    }>;
  }>;
  shippingAddress: {
    city: string;
    district: string;
    details: string;
  };
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const parseStringArray = (value: string[] | undefined): string[] => {
  if (!value || value.length === 0) return [];

  const first = value[0];
  if (value.length === 1 && typeof first === 'string') {
    const trimmed = first.trim();

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        // Ignore invalid JSON-like strings and fallback below.
      }
    }

    if (trimmed.includes(',')) {
      return trimmed
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return value.map((item) => item.trim()).filter(Boolean);
};

const normalizeProduct = (product: ApiProduct): Product => ({
  id: product._id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.images?.[0] || '',
  category: product.category,
  sizes: parseStringArray(product.sizes),
  colors: parseStringArray(product.colors),
});

export const getProducts = async (category?: string): Promise<Product[]> => {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const response = await fetch(`${BASE_URL}/api/v1/products${query}`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const payload: ProductsResponse = await response.json();
  return (payload.data || []).map(normalizeProduct);
};

export const createOrder = async (payload: CreateOrderPayload): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/v1/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }
};

export const createContact = async (payload: ContactPayload): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/v1/contact-us`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to send contact message');
  }
};
