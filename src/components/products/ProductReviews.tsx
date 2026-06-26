import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, User, Mail, Image as ImageIcon, X, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getProductById } from "@/utils/api"; // Import your existing API function

// Types
interface Review {
  id: number;
  name: string;
  email: string;
  image?: string;
  rating: number;
  comment: string;
  created_at?: string;
}

interface ReviewFormData {
  name: string;
  email: string;
  image: string;
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  productId?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { id } = useParams();
  const currentProductId = productId || Number(id);
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    email: "",
    image: "",
    rating: 5,
    comment: ""
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Fetch product data including reviews
  const fetchProductWithReviews = async () => {
    if (!currentProductId) return;
    
    try {
      setLoading(true);
      // Use your existing getProductById API function
      const productData = await getProductById(currentProductId);
      
      // Reviews are embedded in the product response
      const productReviews = productData.reviews || [];
      // Normalize incoming reviews to our Review type (some API shapes may differ)
      const normalizeReviews = (items: any[]): Review[] =>
        items.map((r, i) => ({
          id: r.id ?? r.review_id ?? Date.now() + i,
          name: r.name ?? r.user?.name ?? "Anonymous",
          email: r.email ?? r.user?.email ?? "",
          image: r.image ?? r.avatar ?? r.user?.avatar ?? undefined,
          rating: Number(r.rating) || 0,
          comment: r.comment ?? r.body ?? "",
          created_at: r.created_at ?? r.date ?? undefined,
        }));

      setReviews(normalizeReviews(productReviews));
      
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductWithReviews();
  }, [currentProductId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.comment.trim()) {
      toast.error("Please enter your review comment");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // First, get current product data
      const currentProduct = await getProductById(currentProductId);
      
      // Create new review object
      const newReview = {
        id: Date.now(), // Temporary ID, backend will assign actual ID
        name: formData.name,
        email: formData.email,
        image: formData.image || null,
        rating: formData.rating,
        comment: formData.comment,
        created_at: new Date().toISOString()
      };
      
      // Add to existing reviews
      // Ensure existing reviews are normalized before appending
      const normalizeReviews = (items: any[]): Review[] =>
        items.map((r, i) => ({
          id: r.id ?? r.review_id ?? Date.now() + i,
          name: r.name ?? r.user?.name ?? "Anonymous",
          email: r.email ?? r.user?.email ?? "",
          image: r.image ?? r.avatar ?? r.user?.avatar ?? undefined,
          rating: Number(r.rating) || 0,
          comment: r.comment ?? r.body ?? "",
          created_at: r.created_at ?? r.date ?? undefined,
        }));

      const existing = normalizeReviews(currentProduct.reviews || []);
      const updatedReviews = [...existing, newReview];
      
      // Calculate new average rating
      const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
      const newAverageRating = totalRating / updatedReviews.length;
      
      // Prepare update payload
      const updatePayload = {
        ...currentProduct,
        reviews: updatedReviews,
        average_rating: newAverageRating
      };
      
      // Send update to backend
      const updateResponse = await fetch(`${API_BASE_URL}/api/product/update/${currentProductId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });
      
      if (updateResponse.ok) {
        const updatedProduct = await updateResponse.json();
        setReviews((updatedProduct.reviews && normalizeReviews(updatedProduct.reviews)) || []);
        
        setShowReviewForm(false);
        setFormData({
          name: "",
          email: "",
          image: "",
          rating: 5,
          comment: ""
        });
        setImagePreview("");
        
        toast.success(
          <div className="flex items-center gap-2">
            <Check size={16} />
            <span>Review submitted successfully!</span>
          </div>,
          {
            duration: 3000,
            position: "top-right",
            style: {
              background: "#5C3D2E",
              color: "#f5e7db",
              border: "1px solid #8B6914",
            },
          }
        );
        
        // Refresh product data in parent component
        window.dispatchEvent(new CustomEvent('reviewSubmitted', { detail: { productId: currentProductId } }));
        
      } else {
        throw new Error("Failed to submit review");
      }
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle size={16} />
          <span>Failed to submit review. Please try again.</span>
        </div>,
        {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#dc2626",
            color: "#ffffff",
          },
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => Math.floor(r.rating) === stars).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => Math.floor(r.rating) === stars).length / reviews.length) * 100 
      : 0
  }));

  return (
    <div className="animate-fade-in-up animation-delay-600">
      {/* Reviews Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-sm border border-[#E8D5B7]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#8B6914] rounded-full animate-slide-in-left"></div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#3E2723]">
              Customer Reviews
            </h2>
            <span className="text-sm text-[#795548] bg-[#E8D5B7] px-2 py-1 rounded-full">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>
          
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-2.5 bg-[#5C3D2E] text-white rounded-xl hover:bg-[#4A3226] transition-all transform hover:scale-105 active:scale-95 font-medium shadow-md"
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {/* Rating Summary */}
        {reviews.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#E8D5B7]">
            <div className="text-center lg:text-left">
              <div className="text-5xl font-bold text-[#3E2723] mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? "text-[#C4A747] fill-[#C4A747]"
                        : i < averageRating
                        ? "text-[#C4A747] fill-[#C4A747] opacity-50"
                        : "text-[#D4C4A8]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#795548]">Based on {reviews.length} reviews</p>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-[#3E2723]">{stars}</span>
                    <Star className="w-3 h-3 text-[#C4A747] fill-[#C4A747]" />
                  </div>
                  <div className="flex-1 h-2 bg-[#E8D5B7] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#C4A747] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#795548] w-12">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-8 p-6 bg-white/40 rounded-xl border border-[#E8D5B7] animate-fade-in-up">
            <h3 className="text-xl font-semibold text-[#3E2723] mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#795548]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#D4C4A8] rounded-lg focus:outline-none focus:border-[#8B6914] bg-white/80"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#795548]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#D4C4A8] rounded-lg focus:outline-none focus:border-[#8B6914] bg-white/80"
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          (hoverRating || formData.rating) >= rating
                            ? "text-[#C4A747] fill-[#C4A747]"
                            : "text-[#D4C4A8]"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-[#795548] ml-2">
                    {formData.rating === 5 ? "Excellent" : 
                     formData.rating === 4 ? "Very Good" :
                     formData.rating === 3 ? "Good" :
                     formData.rating === 2 ? "Fair" :
                     formData.rating === 1 ? "Poor" : "Select rating"}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-2">
                  Image URL (Optional)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#795548]" />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#D4C4A8] rounded-lg focus:outline-none focus:border-[#8B6914] bg-white/80"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {imagePreview && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded object-cover" />
                    <button
                      type="button"
                      onClick={() => handleImageUrlChange("")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-2">
                  Review Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#D4C4A8] rounded-lg focus:outline-none focus:border-[#8B6914] bg-white/80 resize-none"
                  placeholder="Share your experience with this product..."
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#5C3D2E] text-white rounded-xl hover:bg-[#4A3226] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2.5 border border-[#D4C4A8] text-[#795548] rounded-xl hover:bg-white/40 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/40 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#E8D5B7] rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-[#E8D5B7] rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-[#E8D5B7] rounded w-1/3 mb-3"></div>
                      <div className="h-16 bg-[#E8D5B7] rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-[#3E2723] mb-2">No Reviews Yet</h3>
            <p className="text-[#795548] mb-4">Be the first to review this product!</p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-2 bg-[#5C3D2E] text-white rounded-xl hover:bg-[#4A3226] transition-all"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div
                key={review.id || idx}
                className="bg-white/40 rounded-xl p-6 border border-[#E8D5B7] hover:border-[#C4A747] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-4 flex-wrap">
                  {review.image && (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h4 className="font-semibold text-[#3E2723]">{review.name}</h4>
                      {review.created_at && (
                        <span className="text-xs text-[#795548]">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-[#C4A747] fill-[#C4A747]"
                              : "text-[#D4C4A8]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[#795548] leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;