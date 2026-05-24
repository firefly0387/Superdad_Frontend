import { ShieldCheck } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffafc] to-white px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-pink-500" size={32} />
          <h1 className="text-5xl font-black">Terms & Conditions</h1>
        </div>

        <div className="space-y-10 mt-16">
          <div className="glass-card">
            <h2>Acceptance of Terms</h2>
            <p>
              By using the Superdad website, customers agree to these terms.
            </p>
          </div>

          <div className="glass-card">
            <h2>User Responsibilities</h2>
            <ul>
              <li>No misuse of the website</li>
              <li>No false information</li>
              <li>No unauthorized access attempts</li>
            </ul>
          </div>

          <div className="glass-card">
            <h2>Order Cancellation</h2>
            <p>
              Orders may be canceled due to stock issues, pricing errors, or
              suspicious activity.
            </p>
          </div>

          <div className="glass-card">
            <h2>Governing Law</h2>
            <p>These terms are governed under the laws of Nepal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}