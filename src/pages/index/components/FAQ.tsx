import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntl } from 'umi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const intl = useIntl();

  const faqItems = [
    {
      question: intl.formatMessage({ id: 'faq.q1' }),
      answer: intl.formatMessage({ id: 'faq.a1' }),
    },
    {
      question: intl.formatMessage({ id: 'faq.q2' }),
      answer: intl.formatMessage({ id: 'faq.a2' }),
    },
    {
      question: intl.formatMessage({ id: 'faq.q3' }),
      answer: intl.formatMessage({ id: 'faq.a3' }),
    },
    {
      question: intl.formatMessage({ id: 'faq.q4' }),
      answer: intl.formatMessage({ id: 'faq.a4' }),
    },
  ];

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            {intl.formatMessage({ id: 'faq.title' })}
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {intl.formatMessage({ id: 'faq.subtitle' })}
          </p>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className={`w-full p-4 text-left text-lg font-medium rounded-lg flex justify-between items-center ${activeIndex === index
                    ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary'
                    : 'bg-white dark:bg-gray-700 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                onClick={() => toggleItem(index)}
              >
                {item.question}
                <span className="flex-shrink-0 ml-2">
                  {activeIndex === index ? (
                    <i className="fas fa-minus text-secondary"></i>
                  ) : (
                    <i className="fas fa-plus text-primary dark:text-gray-400"></i>
                  )}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg border-t-0 border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 mb-6">
            {intl.formatMessage({ id: 'faq.contactPrompt' })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
