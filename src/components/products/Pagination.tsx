import { ChevronLeft, ChevronRight } from "lucide-react";

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
  if (totalPages <= 1) return null;

  return (
    <div className="pt-4 flex justify-center">
      <div className="flex items-center gap-2 rounded-xl border border-[#E8D5B7] bg-white/80 backdrop-blur-sm px-3 py-2 shadow-sm">
        <button
          disabled={!hasPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 h-9 rounded-lg text-sm text-[#5C3D2E] transition hover:bg-[#f5e7db] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        <span className="text-sm text-[#5C3D2E] px-3">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          disabled={!hasNext}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 h-9 rounded-lg text-sm text-[#5C3D2E] transition hover:bg-[#f5e7db] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;