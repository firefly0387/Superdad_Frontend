import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type Props = {
  children: ReactNode;
  skeleton: ReactNode;
};

const LazySection = ({ children, skeleton }: Props) => {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <div ref={ref} className="min-h-50">
      {isInView ? (
        <div className="animate-fade-in">{children}</div>
      ) : (
        skeleton
      )}
    </div>
  );
};

export default LazySection;