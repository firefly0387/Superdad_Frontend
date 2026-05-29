import type { Category } from "@/types/category";
import { Filter, Tag, Flame } from "lucide-react";

type Props = {
  categories: Category[];
  category: number | "";
  setCategory: (v: number | "") => void;
  minPrice: number;
  setMinPrice: (v: number) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  hotDeals: boolean;
  setHotDeals: (v: boolean) => void;
  totalCount: number;
};

const ProductSidebar = ({
  categories,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  hotDeals,
  setHotDeals,
  totalCount,
}: Props) => {
  return (
    <aside className="rounded-2xl border border-[#D4C4A8] bg-white/60 backdrop-blur-sm p-5 space-y-6 shadow-sm sticky top-35">
      <div className="border-b border-[#D4C4A8] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Filter size={18} className="text-[#3E2723]" />
          <h3 className="text-lg font-semibold text-[#3E2723]">Filters</h3>
        </div>
        <p className="text-sm text-[#795548]">{totalCount} products found</p>
      </div>

      {/* CATEGORY */}
      <div>
        <label className="text-sm font-medium text-[#3E2723] mb-2 flex items-center gap-2">
          <Tag size={14} />
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value ? Number(e.target.value) : "")}
          className="w-full h-11 rounded-xl border border-[#D4C4A8] px-3 text-sm text-[#3E2723] bg-white/50 focus:border-[#C4A747] focus:ring-1 focus:ring-[#C4A747] outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div>
        <label className="text-sm font-medium text-[#3E2723] mb-2 block">Price Range</label>
        
        <input
          type="range"
          min={0}
          max={50000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C4A747 0%, #C4A747 ${(maxPrice / 50000) * 100}%, #D4C4A8 ${(maxPrice / 50000) * 100}%, #D4C4A8 100%)`
          }}
        />

        <div className="flex justify-between text-xs text-[#795548] mt-2">
          <span>Rs 0</span>
          <span>Rs {maxPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* HOT DEALS */}
      <div>
        <label className="text-sm font-medium text-[#3E2723] mb-2 block">Special Offers</label>

        <button
          type="button"
          onClick={() => setHotDeals(!hotDeals)}
          className={`w-full h-11 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            hotDeals
              ? "bg-[#3E2723] text-white shadow-sm"
              : "bg-white/50 text-[#3E2723] border border-[#D4C4A8] hover:bg-[#f5e7db]"
          }`}
        >
          <Flame size={16} className={hotDeals ? "text-[#C4A747]" : "text-[#795548]"} />
          Hot Deals
        </button>
      </div>
    </aside>
  );
};

export default ProductSidebar;