type Props = {
  ordering: string;
  setOrdering: (value: string) => void;
};

const ProductFilters = ({ ordering, setOrdering }: Props) => {
  return (
    <div className="flex gap-3">
      <select
        value={ordering}
        onChange={(e) => setOrdering(e.target.value)}
        className="h-12 px-5 rounded-2xl border border-white/70 bg-white/80 backdrop-blur-xl text-sm text-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.03)] outline-none transition focus:border-gray-200 appearance-none"
      >
        <option value="">Sort by</option>
        <option value="-created_at">Newest</option>
        <option value="price">Price Low → High</option>
        <option value="-price">Price High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;