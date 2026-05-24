import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/products/Pagination";
import ProductSidebar from "../components/products/ProductSidebar";
import ProductHero from "../components/products/ProductHero";

import ProductsPageSkeleton from "@/components/skletons/ProductSkleton";

import { getProducts, getCategories } from "@/utils/api";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [ordering, setOrdering] = useState("");

  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const subcategory = searchParams.get("subcategory") || "";

  const [sidebarCategory, setSidebarCategory] = useState<number | "">(
    categoryFromUrl ? Number(categoryFromUrl) : ""
  );

  const [filterOpen, setFilterOpen] = useState(false);

  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [hotDeals, setHotDeals] = useState(false);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // fetch categories
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // sync category to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (sidebarCategory !== "") {
      params.set("category", String(sidebarCategory));
    } else {
      params.delete("category");
    }

    if (subcategory) {
      params.set("subcategory", subcategory);
    }

    setSearchParams(params);
  }, [sidebarCategory, subcategory, setSearchParams]);

  // fetch products
  useEffect(() => {
    setLoading(true);

    getProducts({
      page: currentPage,
      search: debouncedSearch,
      ordering,

      categories:
        sidebarCategory !== ""
          ? sidebarCategory
          : categoryFromUrl
          ? Number(categoryFromUrl)
          : undefined,

      subcategory,
      page_size: 12,
      price__gte: minPrice !== "" ? minPrice : undefined,
      price__lte: maxPrice !== "" ? maxPrice : undefined,
      hot_deal: hotDeals ? true : undefined,
    })
      .then((data) => {
        setProducts(data.results);
        setTotalPages(data.total_pages);
        setTotalCount(data.count);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [
    currentPage,
    debouncedSearch,
    ordering,
    sidebarCategory,
    categoryFromUrl,
    subcategory,
    minPrice,
    maxPrice,
    hotDeals,
  ]);

  // reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, ordering, sidebarCategory, minPrice, maxPrice, hotDeals]);

  const clearFilters = () => {
    setSidebarCategory("");
    setMinPrice("");
    setMaxPrice("");
    setHotDeals(false);
  };

  const activeFilters =
    sidebarCategory !== "" || minPrice !== "" || maxPrice !== "" || hotDeals;

  const sidebarProps = {
    categories,
    category: sidebarCategory,
    setCategory: setSidebarCategory,
    minPrice: typeof minPrice === "number" ? minPrice : 0,
    setMinPrice,
    maxPrice: typeof maxPrice === "number" ? maxPrice : 50000,
    setMaxPrice,
    hotDeals,
    setHotDeals,
    totalCount,
  };

  // ✅ SKELETON FIRST (YouTube style)
  if (loading) {
    return <ProductsPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <ProductHero totalCount={totalCount} />

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-80 px-4 py-2 rounded-xl border bg-white text-sm outline-none"
          />

          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="px-3 py-2 rounded-xl border text-sm bg-white"
          >
            <option value="">Default</option>
            <option value="-created_at">Newest</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-average_rating">Top Rated</option>
          </select>

          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden px-4 py-2 rounded-xl bg-black text-white text-sm"
          >
            Filters
          </button>
        </div>

        {/* MOBILE FILTER */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex lg:hidden">
            <div className="w-[85%] max-w-sm bg-white h-full p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setFilterOpen(false)}>✕</button>
              </div>

              <ProductSidebar {...sidebarProps} />
            </div>
          </div>
        )}

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="hidden lg:block sticky top-35 h-fit">
            <ProductSidebar {...sidebarProps} />
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>
                <span className="text-black font-medium">{totalCount}</span>{" "}
                Products
              </p>

              {activeFilters && (
                <button
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-600"
                >
                  Clear filters
                </button>
              )}
            </div>

            <ProductGrid products={products} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              hasNext={false}
              hasPrevious={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;