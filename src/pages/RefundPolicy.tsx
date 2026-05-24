import { RotateCcw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffafc] to-white px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <RotateCcw className="text-pink-500" size={32} />
          <h1 className="text-5xl font-black">Refund & Return Policy</h1>
        </div>

        <div className="space-y-10 mt-16">
          <div className="glass-card">
            <h2>Return Eligibility</h2>
            <ul>
              <li>Unused and original condition</li>
              <li>Damaged or defective products</li>
              <li>Wrong item delivered</li>
            </ul>
          </div>

          <div className="glass-card">
            <h2>Non-Returnable Items</h2>
            <ul>
              <li>Opened hygiene products</li>
              <li>Baby food and consumables</li>
              <li>Used clothing or feeding products</li>
            </ul>
          </div>

          <div className="glass-card">
            <h2>Refund Process</h2>
            <p>
              Approved refunds are processed within 7–14 business days.
            </p>
          </div>

          <div className="glass-card">
            <h2>Damaged or Incorrect Products</h2>
            <p>
              Report issues within 48 hours with product images and order
              details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}