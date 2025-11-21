/**
 * Products API helpers.
 * DummyJSON integrations and a USE_REMOTE flag to switch between live and local simulation.
 */

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images?: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const DUMMYJSON_API = 'https://dummyjson.com/products';

/**
 * Fetch all products from DummyJSON API
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(DUMMYJSON_API);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data: ProductsResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${DUMMYJSON_API}/categories`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.map((cat: any) => cat.slug);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${DUMMYJSON_API}/${id}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
}
