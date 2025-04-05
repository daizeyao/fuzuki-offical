
import React from 'react';
import { motion } from 'framer-motion';
import { TAOBAO_URL } from '@/constants';


const products = [
  {
    image: [require('@/assets/products/A828.png'), require('@/assets/products/KJ118.png')],
    title: '工业级面板接口',
    description: '面板接口，作为电子设备连接的桥梁，其核心特征在于多功能性、标准化、耐用性与模块化。FUZUKI富崎中经典的A828面板接口集成了万用电源插座、RJ45网口、USB接口及SUB-D9串口，在工业应用中脱颖而出，特别适用于机床、自动化设备等场景。KJ118款全金属面板更具有抗碰撞、耐腐蚀、免干扰等特性。',
  },
  {
    image: [require('@/assets/products/MSDD90341F.png')],
    title: 'USB转接器',
    description: 'MSDD90341F是FUZUKI富崎推出的一款面板安装型USB转接器，支持USB 2.0和USB 3.0标准。该转接器采用氟橡胶防水密封圈，具有良好的耐油性和耐老化性能，同时配备黑色防尘盖，不仅美观大方，还能有效防止灰尘进入。此外，其内部采用STP带屏蔽设计，抗干扰性能优异。该产品广泛应用于机床设备、流水线等工业场景，方便用户通过U盘读取数据，实现高效的数据传输。',
  },
  {
    image: [require('@/assets/products/MSDD90401S.png')],
    title: '网络转接头',
    description: 'MSDD90401S是一款FUZUKI富崎出品的面板安装型网络转接器，专为工业环境设计，提供稳定可靠的高速网络连接。该转接器支持CAT5E和CAT6A标准，能够轻松满足千兆传输需求。此外，MSDD90401S还具备以下特点：\n1. 氟橡胶防水密封圈，耐油耐老化；\n2. 黑色防尘盖，美观大方；\n3. STP带屏蔽，抗干扰性能优异。适用于机床设备、流水线、电信移动局域网等多种工业场景。',
  },
  {
    image: [require('@/assets/products/MSDD08.png'), require('@/assets/products/MSDD228M.png')],
    title: '面板式全金属网口',
    description: 'MSDDO8系列和MSDD228M系列是FUZUKI富崎的工业级金属面板网口，具备即插即用、全金属屏蔽、千兆网速、CAT5E/CAT6A标准，适用于机床、流水线等场景。该系列采用高品质金属材料，有效隔离电磁干扰，确保数据传输的稳定性和可靠性。',
  },
  {
    image: [require('@/assets/products/CES-BES24.png')],
    title: 'CES电缆引入安全系统',
    description: 'CES-BES系列线缆穿墙毛刷框架是FUZUKI富崎专为工业环境设计的线缆管理解决方案。该产品采用模块化设计，安装便捷高效，能有效减少电缆开孔数量，提高柜体密封等级。框架采用优质阻燃材料，安全可靠，并配置M5X20内六角304不锈钢螺丝，确保安装稳固。该系列产品使用无卤无硅优质毛刷，适用于各种线缆穿墙需求，广泛应用于包装机械、光纤电缆、机床、自动化流水线等多个领域。',
  },
  {
    image: [require('@/assets/products/MSDD90341.png')],
    title: '延长线',
    description: '这款FUZUKI富崎MSDD90341系列USB延长线，提供了丰富的规格选择，涵盖USB 2.0和USB 3.0两种标准，以及从0.3米到5米不等的多种长度，并有直头和带防尘盖两种款式，满足不同场景下的数据传输需求。',
  },
];
const Products = () => {

  return (
    <section className="relative bg-light dark:bg-gray-800 py-[15vh] flex items-center overflow-hidden">
      {/* 背景动画元素 */}
      <div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 dark:bg-gray-700/30 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">常用产品展示</h2>
        </motion.div>
        <div className="grid gap-12">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full md:w-1/2">
                <div className="flex flex-wrap justify-center gap-4">
                  {product.image.map((img, imgIndex) => (
                    <motion.img
                      key={imgIndex}
                      src={img}
                      alt={`${product.title} - ${imgIndex + 1}`}
                      className="h-64 object-cover rounded-lg shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0 md:px-8">
                <motion.h2
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                  viewport={{ once: true }}
                >
                  {product.title}
                </motion.h2>
                <motion.p
                  className="text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {product.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <motion.a
            href={TAOBAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition duration-300 btn"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            更多内容详见淘宝店铺
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default Products;
