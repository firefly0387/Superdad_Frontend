type Props = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}: Props) => {
  return (
    <div className="pt-4 flex justify-center">
      <div className="flex items-center gap-3 rounded-[24px] border border-white/70 bg-white/75 backdrop-blur-xl px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <button
          disabled={!hasPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 h-10 rounded-xl text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-30"
        >
          Prev
        </button>

        <span className="text-sm text-gray-600 px-2">
          Page <span className="font-medium text-black">{currentPage}</span> of{" "}
          <span className="font-medium text-black">{totalPages}</span>
        </span>

        <button
          disabled={!hasNext}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 h-10 rounded-xl text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;