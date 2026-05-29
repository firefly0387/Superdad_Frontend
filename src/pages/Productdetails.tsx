import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product, Color } from "@/types/product";
import { getProductById } from "@/utils/api";
import { useCart } from "@/context/CartContext";
import ProductDetailsSkeleton from "@/components/skletons/ProductDetailsSkelton";
import { toast } from "sonner";
import { 
  Minus, Plus, ShoppingCart, Zap, ChevronLeft, 
  ChevronRight, Check, Truck, Shield, RefreshCw, Star, Palette 
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [allImages, setAllImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getProductById(Number(id))
      .then((data) => {
        setProduct(data);
        const images = [
          data.image,
          ...(data.additional_images?.map((img) => img.image) || []),
        ].filter(Boolean);
        setAllImages(images);
        setMainImage(images[0] || "");
        
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading || !product) return <ProductDetailsSkeleton />;

  const handleAddToCart = () => {
    const item = { 
      ...product, 
      quantity,
      selectedColor: selectedColor
    };
    addToCart(item);
    setAddedToCart(true);
    toast.success(
      <div className="flex items-center gap-2">
        <ShoppingCart size={16} />
        <span>Added to cart! {selectedColor && `(${selectedColor.name})`}</span>
      </div>,
      {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      }
    );
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(product.quantity || 99, quantity + delta)));
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    setMainImage(allImages[(selectedImageIndex + 1) % allImages.length]);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setMainImage(allImages[(selectedImageIndex - 1 + allImages.length) % allImages.length]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5e7db] pt-27.5 md:pt-30">
      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* LEFT COLUMN - IMAGES */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Main Image with Enhanced Zoom */}
            <div 
              className="relative group rounded-2xl overflow-hidden bg-[#D4C4A8]/30 shadow-lg cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="relative overflow-hidden">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-125 object-cover transition-all duration-500"
                  style={{
                    transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  }}
                />
              </div>
              
              {/* Image Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 duration-300"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#5C3D2E]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 duration-300"
                  >
                    <ChevronRight className="w-5 h-5 text-[#5C3D2E]" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-[#5C3D2E]/80 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setMainImage(img);
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-300 ${
                    mainImage === img
                      ? "ring-2 ring-[#8B6914] ring-offset-2 scale-95"
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - PRODUCT INFO */}
          <div className="space-y-8 animate-fade-in-up animation-delay-200">
            {/* Breadcrumb */}
            <div className="text-sm text-[#795548] animate-slide-in-left">
              {product.categories?.map((c, i) => (
                <span key={i}>
                  {c.category_title}
                  {i < (product.categories?.length || 0) - 1 && " / "}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-light text-[#3E2723] leading-tight animate-slide-in-left animation-delay-300">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 animate-slide-in-left animation-delay-400">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.average_rating || 0)
                        ? "text-[#C4A747] fill-[#C4A747]"
                        : "text-[#D4C4A8]"
                    }`}
                  />
                ))}
                <span className="font-semibold text-[#3E2723] ml-2">{product.average_rating || 0}</span>
                <span className="text-[#795548]">/ 5</span>
              </div>
              <span className="text-[#D4C4A8]">|</span>
              <button className="text-sm text-[#795548] hover:text-[#5C3D2E] transition-colors hover:underline">
                Write a review
              </button>
            </div>

            {/* Price */}
            <div className="space-y-2 border-b border-[#E8D5B7] pb-6 animate-slide-in-left animation-delay-500">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl lg:text-4xl font-bold text-[#3E2723]">
                  Rs {product.final_price.toLocaleString()}
                </span>
                {product.discount_per && (
                  <>
                    <span className="text-xl text-[#795548] line-through">
                      Rs {Number(product.price).toLocaleString()}
                    </span>
                    <span className="bg-[#C4A747]/20 text-[#8B6914] px-2 py-1 rounded-lg text-sm font-medium animate-pulse">
                      {product.discount_per}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-[#795548]">Inclusive of all taxes</p>
            </div>

            {/* Color Selection Section */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3 animate-slide-in-left animation-delay-550">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#795548]" />
                  <label className="text-sm font-medium text-[#3E2723]">Color</label>
                  {selectedColor && (
                    <span className="text-xs text-[#795548] ml-2">
                      ({selectedColor.name})
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`relative group transition-all duration-300 ${
                        selectedColor?.id === color.id
                          ? "scale-110 ring-2 ring-offset-2 ring-[#8B6914]"
                          : "hover:scale-105"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full shadow-md cursor-pointer transition-transform"
                        style={{ backgroundColor: color.hex_code }}
                        title={color.name}
                      />
                      {selectedColor?.id === color.id && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-3 animate-slide-in-left animation-delay-600">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                product.quantity > 0 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  product.quantity > 0 ? "bg-green-600 animate-pulse" : "bg-red-600"
                }`} />
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </div>
              {product.quantity > 0 && product.quantity < 20 && (
                <p className="text-sm text-orange-600 animate-shake">
                  ⚡ Only {product.quantity} left in stock
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3 pt-4 animate-slide-in-left animation-delay-700">
              <label className="text-sm font-medium text-[#3E2723]">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full border border-[#D4C4A8] flex items-center justify-center hover:border-[#8B6914] hover:bg-[#f5e7db] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95 duration-200"
                >
                  <Minus className="w-4 h-4 text-[#3E2723]" />
                </button>
                <span className="text-xl font-semibold min-w-10 text-center text-[#3E2723] transition-all duration-200">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product.quantity || 99)}
                  className="w-10 h-10 rounded-full border border-[#D4C4A8] flex items-center justify-center hover:border-[#8B6914] hover:bg-[#f5e7db] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95 duration-200"
                >
                  <Plus className="w-4 h-4 text-[#3E2723]" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 animate-slide-in-left animation-delay-800">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#5C3D2E] text-white py-3.5 rounded-xl hover:bg-[#4A3226] transition-all flex items-center justify-center gap-2 font-medium text-lg transform hover:scale-[1.02] active:scale-[0.98] group"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  addToCart({ 
                    ...product, 
                    quantity,
                    selectedColor 
                  });
                  navigate("/checkout");
                }}
                className="w-full bg-white border-2 border-[#5C3D2E] text-[#5C3D2E] py-3.5 rounded-xl hover:bg-[#f5e7db] transition-all flex items-center justify-center gap-2 font-medium text-lg transform hover:scale-[1.02] active:scale-[0.98] group"
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Buy Now
              </button>
            </div>

            {/* Delivery Info Cards */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E8D5B7] animate-slide-in-left animation-delay-900">
              <div className="text-center p-3 rounded-xl hover:bg-white/40 transition-all group">
                <Truck className="w-5 h-5 mx-auto text-[#795548] group-hover:scale-110 transition-transform" />
                <p className="text-xs text-[#795548] mt-1">Free Shipping</p>
              </div>
              <div className="text-center p-3 rounded-xl hover:bg-white/40 transition-all group">
                <Shield className="w-5 h-5 mx-auto text-[#795548] group-hover:scale-110 transition-transform" />
                <p className="text-xs text-[#795548] mt-1">2 Year Warranty</p>
              </div>
              <div className="text-center p-3 rounded-xl hover:bg-white/40 transition-all group">
                <RefreshCw className="w-5 h-5 mx-auto text-[#795548] group-hover:scale-110 transition-transform" />
                <p className="text-xs text-[#795548] mt-1">7 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL INFORMATION SECTIONS */}
        <div className="mt-20 space-y-12">
          {/* Description Section */}
          {product.description && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-sm border border-[#E8D5B7] hover:shadow-md transition-all duration-300 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-[#8B6914] rounded-full animate-slide-in-left"></div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-[#3E2723]">
                  Description
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-[#795548] leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          )}
          
          {/* Highlights Section */}
          {product.sub_description && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-sm border border-[#E8D5B7] hover:shadow-md transition-all duration-300 animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-[#8B6914] rounded-full animate-slide-in-left"></div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-[#3E2723]">
                  Product Highlights
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-[#795548] leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: product.sub_description }}
                />
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-sm border border-[#E8D5B7] hover:shadow-md transition-all duration-300 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#8B6914] rounded-full animate-slide-in-left"></div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-[#3E2723]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {product.faqs.map((faq, idx) => (
                  <details
                    key={faq.id || idx}
                    className="group border border-[#E8D5B7] rounded-xl hover:border-[#C4A747] transition-all duration-300 bg-white/40"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <summary className="font-semibold text-[#3E2723] list-none flex items-center justify-between p-6 cursor-pointer">
                      <span 
                        className="pr-4"
                        dangerouslySetInnerHTML={{ __html: faq.question }}
                      />
                      <div className="text-[#795548] group-open:rotate-180 transition-transform duration-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </summary>
                    <div
                      className="px-6 pb-6 text-[#795548] leading-relaxed border-t border-[#E8D5B7] pt-4 animate-fade-in"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 bg-[#5C3D2E] text-white p-3 rounded-full shadow-lg hover:bg-[#4A3226] transition-all hover:scale-110 active:scale-95 animate-bounce-in z-40"
        >
          <ChevronRight className="w-5 h-5 -rotate-90" />
        </button>
      )}

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#E8D5B7] p-4 flex gap-3 lg:hidden shadow-lg animate-slide-in-up z-30">
        <div className="flex-1">
          <div className="text-sm text-[#795548] mb-1">Total Price</div>
          <div className="text-xl font-bold text-[#3E2723]">
            Rs {(product.final_price * quantity).toLocaleString()}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#5C3D2E] text-white py-3 rounded-xl hover:bg-[#4A3226] transition-all active:scale-95 font-medium"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addToCart({ 
              ...product, 
              quantity,
              selectedColor 
            });
            navigate("/checkout");
          }}
          className="flex-1 border-2 border-[#5C3D2E] text-[#5C3D2E] py-3 rounded-xl hover:bg-[#f5e7db] transition-all active:scale-95 font-medium"
        >
          Buy Now
        </button>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="h-20 lg:h-0" />
    </div>
  );
};

export default ProductDetails;