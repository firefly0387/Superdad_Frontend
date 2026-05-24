import type { Category } from "@/types/category";

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
  minPrice,
  maxPrice,
  setMaxPrice,
  hotDeals,
  setHotDeals,
  totalCount,
}: Props) => {
  return (
    <aside className="rounded-[28px] border bg-white/80 backdrop-blur-xl p-5 space-y-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold">Filters</h3>
        <p className="text-sm text-gray-500">{totalCount} results</p>
      </div>

      {/* CATEGORY */}
      <div>
        <p className="text-sm font-medium mb-2">Category</p>
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value ? Number(e.target.value) : "")
          }
          className="w-full h-11 rounded-xl border px-3 text-sm"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div>
        <p className="text-sm font-medium mb-2">Price</p>

        <input
          type="range"
          min={0}
          max={50000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
        </div>
      </div>

      {/* HOT DEALS */}
      <div>
        <p className="text-sm font-medium mb-2">Special</p>

        <button
          type="button"
          onClick={() => setHotDeals(!hotDeals)}
          className={`w-full h-11 rounded-2xl text-sm font-medium transition-all duration-300 border ${
            hotDeals
              ? "bg-black text-white border-black shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-white"
          }`}
        >
          🔥 Hot Deals
        </button>
      </div>
    </aside>
  );
};

export default ProductSidebar;