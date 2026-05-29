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
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [ordering, setOrdering] = useState("");

  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const subcategory = searchParams.get("subcategory") || "";

  const [sidebarCategory, setSidebarCategory] = useState<number | "">(
    categoryFromUrl ? Number(categoryFromUrl) : "",
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
        setHasNext(!!data.links?.next);
        setHasPrevious(!!data.links?.previous);
        if (data.current_page) {
          setCurrentPage(data.current_page);
        }
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
  }, [
    debouncedSearch,
    ordering,
    sidebarCategory,
    minPrice,
    maxPrice,
    hotDeals,
  ]);

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

  // SKELETON FIRST
  if (loading) {
    return <ProductsPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f5e7db] pt-27.5 md:pt-30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <ProductHero totalCount={totalCount} />

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-80 px-4 py-2 rounded-xl border border-[#E8D5B7] bg-white/50 backdrop-blur-sm text-[#5C3D2E] text-sm outline-none focus:border-[#8B6914] focus:ring-1 focus:ring-[#8B6914] placeholder:text-[#8B6914]/50"
          />

          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8D5B7] bg-white/50 backdrop-blur-sm text-[#5C3D2E] text-sm focus:border-[#8B6914] focus:ring-1 focus:ring-[#8B6914]"
          >
            <option value="">Default</option>
            <option value="-created_at">Newest</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-average_rating">Top Rated</option>
          </select>

          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden px-4 py-2 rounded-xl bg-[#5C3D2E] text-[#f5e7db] text-sm hover:bg-[#4A3226] transition"
          >
            Filters
          </button>
        </div>

        {/* MOBILE FILTER */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex lg:hidden">
            <div className="w-[85%] max-w-sm bg-white/95 backdrop-blur-sm h-full p-5 overflow-y-auto border-r border-[#E8D5B7]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#5C3D2E]">
                  Filters
                </h3>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="text-[#5C3D2E] hover:text-[#8B6914]"
                >
                  ✕
                </button>
              </div>

              <ProductSidebar {...sidebarProps} />
            </div>
          </div>
        )}

        {/* MAIN - Fixed grid for sticky sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar - sticky works from here */}
          <div className="lg:block">
            <ProductSidebar {...sidebarProps} />
          </div>
          
          {/* Products Grid */}
          <div className="space-y-5">
            <div className="flex items-center justify-between text-sm">
              <p className="text-[#5C3D2E]/70">
                <span className="text-[#5C3D2E] font-medium">{totalCount}</span>{" "}
                Products
              </p>

              {activeFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[#8B6914] hover:text-[#5C3D2E] transition"
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
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;