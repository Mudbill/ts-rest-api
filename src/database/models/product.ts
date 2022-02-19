import { db } from "..";

/**
 * Describes a product object in the database
 */
export interface Product {
  type: "product";
  data: ProductData;
}

/**
 * Describes the data specific to a product
 */
export interface ProductData {
  name: string;
  price: number;
  stock: number;
}

/**
 * List all products
 * @returns array of products
 */
export function getProducts() {
  return db.find<Product>({ type: "product" });
}

/**
 * Create a new product
 * @param product
 * @returns the created product
 */
export function createProduct(product: Omit<ProductData, "stock">) {
  return db.insert<Product>({
    type: "product",
    data: {
      name: product.name,
      price: product.price,
      stock: 0,
    },
  });
}
