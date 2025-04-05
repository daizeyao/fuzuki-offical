import React from 'react';
import { motion } from 'framer-motion';

const featuresList = [
  {
    icon: 'fa-rocket',
    title: '数据传输',
    description: 'USB母座连接器、网口转接头等产品，支持高速稳定的数据传输，满足U盘、网络设备等的连接需求'
  },
  {
    icon: 'fa-plug',
    title: '接口扩展',
    description: '前置面板接口组合插座、机床设备调试接口盒等，提供多种接口扩展，方便设备连接外设。'
  },
  {
    icon: 'fa-tint',
    title: '防水防护',
    description: '防水连接器、防水网线对接连接器等，具备防水、防尘功能，适应恶劣环境。'
  },
  {
    icon: 'fa-industry',
    title: '工业级品质',
    description: '产品主要面向工业应用，具有较高的耐用性和稳定性。适用于各种工业设备和环境。'
  },
  {
    icon: 'fa-bolt',
    title: '高速连接',
    description: 'CAT6A网线对插接头、千兆连接器等产品，支持高速网络连接，保证数据传输的效率和稳定性。'
  },
  {
    icon: 'fa-shield-alt',
    title: '信号屏蔽',
    description: '部分产品采用金属屏蔽设计，有效减少电磁干扰，保障信号传输稳定。'
  }
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <section id="features" className="py-20 dark:bg-gray-900">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">我们的功能</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">探索我们平台的强大功能</p>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuresList.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-gray-700/30 rounded-full flex items-center justify-center mb-6">
                <i className={`fas ${feature.icon} text-primary dark:text-secondary text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 