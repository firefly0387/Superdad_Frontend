import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { getProductById } from "@/utils/api";
import { useCart } from "@/context/CartContext";
import ProductDetailsSkeleton from "@/components/skletons/ProductDetailsSkelton";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [allImages, setAllImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getProductById(Number(id))
      .then((data) => {
        setProduct(data);

        const images: string[] = [];
        if (data?.image) images.push(data.image);
        if (Array.isArray(data.additional_images)) {
          images.push(...data.additional_images);
        }

        setAllImages(images);
        setMainImage(data?.image || "");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({ ...product, quantity });
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  // ✅ SKELETON FIRST (YouTube style)
  if (loading || !product) {
    return <ProductDetailsSkeleton />;
  }

  // Clean HTML
  const cleanHTML = (html: string) => {
    if (!html) return "";
    return html
      .replace(/<p>/g, "<p class='text-gray-700 leading-relaxed mb-4 text-base md:text-lg font-normal'>")
      .replace(/<strong>/g, "<strong class='text-gray-900 font-semibold'>")
      .replace(/<b>/g, "<b class='text-gray-900 font-semibold'>")
      .replace(/<ul>/g, "<ul class='list-disc pl-6 mb-4 space-y-2'>")
      .replace(/<li>/g, "<li class='text-gray-700 text-base md:text-lg mb-2'>")
      .replace(/<h1>/g, "<h1 class='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>")
      .replace(/<h2>/g, "<h2 class='text-xl md:text-2xl font-semibold text-gray-800 mb-3 mt-4'>")
      .replace(/<h3>/g, "<h3 class='text-lg md:text-xl font-semibold text-gray-800 mb-2'>")
      .replace(/<span>/g, "<span class='text-gray-700'>");
  };

  return (
    <div className="min-h-screen bg-[#fdf8f5]">

      {/* Added to cart popup */}
      {showAddedMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-up">
          <div className="bg-[#2d3e3a] text-white px-6 py-3 rounded-full shadow-xl text-sm">
            ✨ Added to cart! ✨
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5 py-8 md:py-12">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-gray-500 hover:text-[#f5a3c7]"
        >
          ← back to shop
        </button>

        {/* MAIN */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">

          {/* LEFT IMAGE */}
          <div>
            <div className="rounded-3xl overflow-hidden mb-4">
              <img
                src={mainImage}
                className="w-full h-[400px] md:h-[500px] object-cover"
                alt={product.title}
              />
            </div>

            {/* thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden ${
                      mainImage === img ? "ring-2 ring-pink-300" : ""
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT INFO */}
          <div className="space-y-6">

            <h1 className="text-4xl font-bold">{product.title}</h1>

            <p className="text-2xl font-semibold">
              Rs {Number(product.price).toLocaleString()}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 rounded-full"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart({ ...product, quantity });
                  navigate("/checkout");
                }}
                className="flex-1 border py-3 rounded-full"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        {product.description && (
          <div className="border-t pt-10">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(product.description) }} />
          </div>
        )}
      </div>

      {/* animation */}
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-up {
          animation: fade-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;