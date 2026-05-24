import { CreditCard } from "lucide-react";

export default function PaymentPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffafc] to-white px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <CreditCard className="text-pink-500" size={32} />
          <h1 className="text-5xl font-black">Payment Policy</h1>
        </div>

        <div className="space-y-10 mt-16">
          <div className="glass-card">
            <h2>Accepted Payment Methods</h2>

            <ul>
              <li>Cash on Delivery</li>
              <li>eSewa</li>
              <li>Khalti</li>
              <li>Fonepay</li>
              <li>Debit/Credit Cards</li>
            </ul>
          </div>

          <div className="glass-card">
            <h2>Payment Security</h2>

            <p>
              We use secure payment systems and do not store sensitive banking
              information.
            </p>
          </div>

          <div className="glass-card">
            <h2>Failed Transactions</h2>

            <p>
              Contact customer support if payment is deducted but order is not
              confirmed.
            </p>
          </div>

          <div className="glass-card">
            <h2>Fraud Prevention</h2>

            <p>
              Superdad may review or cancel suspicious transactions for customer
              protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}