import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

// ProductGrid.tsx
const ProductGrid = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#8B6914]/70">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;