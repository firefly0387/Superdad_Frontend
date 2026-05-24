type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="relative w-full md:w-[340px]">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full h-12 rounded-2xl border border-white/70 bg-white/80 backdrop-blur-xl px-5 pr-12 text-sm text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.03)] outline-none transition focus:border-gray-200 focus:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        ⌕
      </div>
    </div>
  );
};

export default SearchBar;