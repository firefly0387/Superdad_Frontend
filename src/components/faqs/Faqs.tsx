import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 md:px-20 py-24 bg-linear-to-b from-gray-50 to-white">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Everything you need to know about SuperDad
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={faq.id}
              onClick={() => toggleFAQ(index)}
              className="rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Question */}
              <div className="flex items-center justify-between p-6">
                <h3 className="text-sm md:text-base font-medium text-gray-800">
                  {faq.question}
                </h3>

                <div
                  className={`p-2 rounded-full bg-gray-50 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-amber-50" : ""
                  }`}
                >
                  <ChevronDown size={18} className="text-gray-600" />
                </div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;