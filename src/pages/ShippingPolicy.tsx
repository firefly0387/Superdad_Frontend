import { Truck } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffafc] to-white px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <Truck className="text-pink-500" size={32} />
          <h1 className="text-5xl font-black">Shipping Policy</h1>
        </div>

        <div className="space-y-10 mt-16">
          <div className="glass-card">
            <h2>Delivery Coverage</h2>
            <p>Superdad delivers across Nepal.</p>
          </div>

          <div className="glass-card">
            <h2>Estimated Delivery Time</h2>
            <ul>
              <li>Kathmandu Valley: 1–3 business days</li>
              <li>Outside Valley: 3–7 business days</li>
            </ul>
          </div>

          <div className="glass-card">
            <h2>Shipping Charges</h2>
            <p>Charges depend on location, package size, and promotions.</p>
          </div>

          <div className="glass-card">
            <h2>Order Tracking</h2>
            <p>Customers may receive updates via SMS, email, or phone call.</p>
          </div>
        </div>
      </div>
    </div>
  );
}