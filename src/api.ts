import { Category } from './types/Category';
import { ProductExpand } from './types/ProductExpand';
import { Product } from './types/Product';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/api/products.json');
  return response.json();
}

export async function getProductsWithDetails(
  category: Category,
): Promise<ProductExpand[]> {
  const response = await fetch(`../api/${category}.json`);
  return response.json();
}

export async function getProductById(
  category: Category,
  id: string | undefined,
): Promise<ProductExpand | null> {
  try {
    const products = await getProductsWithDetails(category);
    const foundProduct = products.find((product) => product.id === id);
    return foundProduct || null;
  } catch (error) {
    console.error(`Error fetching product from category ${category}:`, error);
    throw new Error('Failed to fetch product.');
  }
}
