import { motion } from 'framer-motion';
import { useIntl } from 'umi';

const Services = () => {
  const intl = useIntl();

  const servicesList = [
    {
      title: intl.formatMessage({ id: 'services.pre.title' }),
      description: intl.formatMessage({ id: 'services.pre.desc' }),
      features: [
        intl.formatMessage({ id: 'services.pre.feature1' }),
        intl.formatMessage({ id: 'services.pre.feature2' }),
      ],
      icon: 'fa-comments',
    },
    {
      title: intl.formatMessage({ id: 'services.mid.title' }),
      description: intl.formatMessage({ id: 'services.mid.desc' }),
      features: [
        intl.formatMessage({ id: 'services.mid.feature1' }),
        intl.formatMessage({ id: 'services.mid.feature2' }),
      ],
      icon: 'fa-money-check-alt',
    },
    {
      title: intl.formatMessage({ id: 'services.post.title' }),
      description: intl.formatMessage({ id: 'services.post.desc' }),
      features: [
        intl.formatMessage({ id: 'services.post.feature1' }),
        intl.formatMessage({ id: 'services.post.feature2' }),
      ],
      icon: 'fa-headset',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            {intl.formatMessage({ id: 'services.title' })}
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {intl.formatMessage({ id: 'services.subtitle' })}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-primary dark:bg-gray-900 p-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className={`fas ${service.icon} text-white`}></i>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <i className="fas fa-check text-secondary mr-2"></i>
                      <span className="dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
