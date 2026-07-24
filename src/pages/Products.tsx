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
import SEO from "@/components/seo/seo";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategoriesLoaded, setAllCategoriesLoaded] = useState(false);

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

  // Get values from URL - do this on every render
  const categoryTitleFromUrl = searchParams.get("category") || "";
  const subcategoryTitle = searchParams.get("subcategory") || "";
  const hotDealsFromUrl = searchParams.get("hotDeals") === "true";
  const maxPriceFromUrl = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : 50000;

  // Store category ID for API calls
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [subcategoryId, setSubcategoryId] = useState<number | "">("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">(maxPriceFromUrl);
  const [hotDeals, setHotDeals] = useState(hotDealsFromUrl);

  const [filterOpen, setFilterOpen] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // fetch categories first
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        setAllCategoriesLoaded(true);
      })
      .catch(console.error);
  }, []);

  // Convert URL titles to IDs after categories are loaded OR when URL changes
  useEffect(() => {
    if (!allCategoriesLoaded) return;

    // Convert category title to ID
    if (categoryTitleFromUrl) {
      const category = categories.find((c) => c.title === categoryTitleFromUrl);
      if (category) {
        if (categoryId !== category.id) {
          setCategoryId(category.id);
        }
      } else {
        setCategoryId("");
      }
    } else {
      setCategoryId("");
    }

    // Convert subcategory title to ID
    if (subcategoryTitle) {
      let foundSubId = null;
      for (const cat of categories) {
        const sub = cat.subcategories.find((s) => s.title === subcategoryTitle);
        if (sub) {
          foundSubId = sub.id;
          break;
        }
      }
      if (foundSubId) {
        if (subcategoryId !== foundSubId) {
          setSubcategoryId(foundSubId);
        }
      } else {
        setSubcategoryId("");
      }
    } else {
      setSubcategoryId("");
    }

    setInitialLoadDone(true);
  }, [categoryTitleFromUrl, subcategoryTitle, categories, allCategoriesLoaded]);

  // DO NOT automatically update URL from state - this was causing the issue
  // Remove the effect that was updating URL from state

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    if (initialLoadDone) {
      setCurrentPage(1);
    }
  }, [
    categoryId,
    subcategoryId,
    debouncedSearch,
    ordering,
    minPrice,
    maxPrice,
    hotDeals,
  ]);

  // Fetch products
  useEffect(() => {
    if (!allCategoriesLoaded) return;

    setLoading(true);

    const fetchParams: any = {
      page: currentPage,
      page_size: 12,
    };

    if (debouncedSearch) fetchParams.search = debouncedSearch;
    if (ordering) fetchParams.ordering = ordering;
    if (categoryId !== "") fetchParams.categories = categoryId;
    if (subcategoryId !== "") fetchParams.subcategory = subcategoryId;
    if (minPrice !== "") fetchParams.price__gte = minPrice;
    if (maxPrice !== "" && maxPrice !== 50000)
      fetchParams.price__lte = maxPrice;
    if (hotDeals) fetchParams.hot_deal = true;

    getProducts(fetchParams)
      .then((data) => {
        setProducts(data.results || []);
        setTotalPages(data.total_pages || 1);
        setTotalCount(data.count || 0);
        setHasNext(!!data.links?.next);
        setHasPrevious(!!data.links?.previous);
        if (data.current_page) {
          setCurrentPage(data.current_page);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalCount(0);
      })
      .finally(() => setLoading(false));
  }, [
    currentPage,
    debouncedSearch,
    ordering,
    categoryId,
    subcategoryId,
    minPrice,
    maxPrice,
    hotDeals,
    allCategoriesLoaded,
  ]);

  // Update URL when filters change (but preserve existing params)
  const updateURL = (updates: {
    category?: string;
    subcategory?: string;
    hotDeals?: boolean;
    maxPrice?: number;
  }) => {
    const params = new URLSearchParams(searchParams);

    if (updates.category !== undefined) {
      if (updates.category) {
        params.set("category", updates.category);
      } else {
        params.delete("category");
      }
    }

    if (updates.subcategory !== undefined) {
      if (updates.subcategory) {
        params.set("subcategory", updates.subcategory);
      } else {
        params.delete("subcategory");
      }
    }

    if (updates.hotDeals !== undefined) {
      if (updates.hotDeals) {
        params.set("hotDeals", "true");
      } else {
        params.delete("hotDeals");
      }
    }

    if (updates.maxPrice !== undefined) {
      if (updates.maxPrice && updates.maxPrice !== 50000) {
        params.set("maxPrice", updates.maxPrice.toString());
      } else {
        params.delete("maxPrice");
      }
    }

    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (id: number | "") => {
    if (id === "") {
      setCategoryId("");
      updateURL({ category: "" });
    } else {
      const category = categories.find((c) => c.id === id);
      if (category) {
        setCategoryId(id);
        updateURL({ category: category.title });
      }
    }
    setSubcategoryId("");
    updateURL({ subcategory: "" });
  };

  const handleHotDealsChange = (value: boolean) => {
    setHotDeals(value);
    updateURL({ hotDeals: value });
  };

  const handleMaxPriceChange = (value: number | "") => {
    setMaxPrice(value);
    updateURL({ maxPrice: value as number });
  };

  const clearFilters = () => {
    setCategoryId("");
    setSubcategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setHotDeals(false);
    setSearch("");
    setOrdering("");
    updateURL({ category: "", subcategory: "", hotDeals: false, maxPrice: 0 });
  };

  const activeFilters =
    categoryId !== "" ||
    subcategoryId !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    hotDeals ||
    search !== "" ||
    ordering !== "";

  const sidebarProps = {
    categories,
    categoryId: categoryId,
    setCategoryId: handleCategoryChange,
    minPrice: typeof minPrice === "number" ? minPrice : 0,
    setMinPrice,
    maxPrice: typeof maxPrice === "number" ? maxPrice : 50000,
    setMaxPrice: handleMaxPriceChange,
    hotDeals,
    setHotDeals: handleHotDealsChange,
    totalCount,
  };

  // SKELETON FIRST
  if (loading || !allCategoriesLoaded) {
    return <ProductsPageSkeleton />;
  }

  return (
    <>
      <SEO
        title="Products"
        description="Browse premium baby clothing, toys, feeding essentials, diapers, and accessories."
      />
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
            <div className="hidden lg:block">
              <ProductSidebar {...sidebarProps} />
            </div>

            {/* Products Grid */}
            <div className="space-y-5">
              <div className="flex items-center justify-between text-sm">
                <p className="text-[#5C3D2E]/70">
                  <span className="text-[#5C3D2E] font-medium">
                    {totalCount}
                  </span>{" "}
                  Products found
                </p>

                {activeFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[#8B6914] hover:text-[#5C3D2E] transition text-sm"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12 bg-white/40 rounded-2xl">
                  <p className="text-[#795548]">No products found</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[#8B6914] hover:text-[#5C3D2E] transition"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  hasNext={hasNext}
                  hasPrevious={hasPrevious}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
