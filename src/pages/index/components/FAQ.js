import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqItems = [
  {
    question: '产品是否有质量保证？',
    answer: '我们对产品质量严格把控，所有产品均经过严格的质量检测，符合相关行业标准。同时，我们提供完善的售后服务，包括一年质保。如果您在使用过程中遇到任何质量问题，我们将及时为您解决。'
  },
  {
    question: '产品支持定制吗？',
    answer: '是的，我们支持定制服务。如果您有特殊需求，如特定的接口类型、尺寸、颜色等，可以与我们的销售工程师联系，我们将根据您的需求为您提供定制化的解决方案。'
  },
  {
    question: '发货时间是多久？',
    answer: '对于现货产品，我们会在收到订单后的24小时内安排发货。对于非现货产品，我们会根据生产进度与您协商具体的发货时间，并及时通知您订单的进展情况。'
  },
  {
    question: '产品安装需要专业人员吗？',
    answer: '大部分产品安装较为简单，普通用户按照说明书即可自行完成安装。对于一些复杂的安装需求，我们建议您联系专业的技术人员进行安装，以确保安装的正确性和安全性。如果您在安装过程中遇到任何问题，也可以随时联系我们的客服人员，我们将为您提供技术支持和指导。'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleItem = (index) => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">常见问题</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">对我们服务的一些常见疑问解答</p>
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
                className={`w-full p-4 text-left text-lg font-medium rounded-lg flex justify-between items-center ${
                  activeIndex === index 
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
          <p className="text-gray-700 mb-6">还有其他问题？请直接联系我们</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 