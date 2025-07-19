import React from 'react';
import { motion } from 'framer-motion';
import { useIntl } from 'umi';

const Features = () => {
  const intl = useIntl();

  const featuresList = [
    {
      icon: 'fa-rocket',
      title: intl.formatMessage({ id: 'features.item1.title' }),
      description: intl.formatMessage({ id: 'features.item1.desc' }),
    },
    {
      icon: 'fa-plug',
      title: intl.formatMessage({ id: 'features.item2.title' }),
      description: intl.formatMessage({ id: 'features.item2.desc' }),
    },
    {
      icon: 'fa-tint',
      title: intl.formatMessage({ id: 'features.item3.title' }),
      description: intl.formatMessage({ id: 'features.item3.desc' }),
    },
    {
      icon: 'fa-industry',
      title: intl.formatMessage({ id: 'features.item4.title' }),
      description: intl.formatMessage({ id: 'features.item4.desc' }),
    },
    {
      icon: 'fa-bolt',
      title: intl.formatMessage({ id: 'features.item5.title' }),
      description: intl.formatMessage({ id: 'features.item5.desc' }),
    },
    {
      icon: 'fa-shield-alt',
      title: intl.formatMessage({ id: 'features.item6.title' }),
      description: intl.formatMessage({ id: 'features.item6.desc' }),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            {intl.formatMessage({ id: 'features.title' })}
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {intl.formatMessage({ id: 'features.subtitle' })}
          </p>
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
