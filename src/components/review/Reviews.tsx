
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

const Reviews = () => {
  return (
    <section className="w-full px-6 md:px-20 py-20 bg-white">

      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-widest text-gray-400 mb-2">
          REVIEWS
        </p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Loved by Parents 💛
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Real feedback from happy families
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-2xl border bg-gray-50 hover:bg-white hover:shadow-md transition"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating
                      ? "fill-black text-black"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-600 leading-relaxed">
              "{review.comment}"
            </p>

            {/* Name */}
            <p className="mt-4 text-sm font-medium text-gray-800">
              — {review.name}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Reviews;