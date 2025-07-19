import React from 'react';
import { motion } from 'framer-motion';
import { useIntl } from 'umi';
import { TAOBAO_URL, DOUYIN_URL } from '@/constants';

const wechat_img = require('@/assets/wechat.png');

const Footer = () => {
  const [showWeChat, setShowWeChat] = React.useState(false);
  const intl = useIntl();

  return (
    <footer className="bg-primary dark:bg-gray-900 text-white pt-16 pb-8" id="footer">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-secondary">富崎</span>
              <span className="text-white">Fuzuki</span>
            </h3>
            <p className="text-gray-300 mb-6">{intl.formatMessage({ id: 'slogan' })}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{intl.formatMessage({ id: 'company' })}</h4>
            <ul className="flex flex-col space-y-2">
              <li><a href="/#about" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'about' })}</a></li>
              <li><a href="/#products" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'products' })}</a></li>
              <li><a href="/#features" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'features' })}</a></li>
              <li><a href="/#services" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'services' })}</a></li>
              <li><a href="/#faq" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'faq' })}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{intl.formatMessage({ id: 'more' })}</h4>
            <ul className="flex flex-col space-y-2">
              <li><a href={TAOBAO_URL} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'taobao' })}</a></li>
              <li><a href={DOUYIN_URL} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'douyin' })}</a></li>
              <li><a href="/products-show" className="text-gray-300 hover:text-secondary transition-colors">{intl.formatMessage({ id: 'showcase' })}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{intl.formatMessage({ id: 'contact' })}</h4>
            <ul className="flex flex-col space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">{intl.formatMessage({ id: 'address' })}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">{intl.formatMessage({ id: 'phone' })}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">{intl.formatMessage({ id: 'email' })}</span>
              </li>
              <li className="flex items-start relative">
                <i className="fas fa-comments mt-1 mr-3 text-secondary"></i>
                <div
                  className="text-gray-300 hover:text-secondary transition-colors cursor-pointer"
                  onMouseEnter={() => setShowWeChat(true)}
                  onMouseLeave={() => setShowWeChat(false)}
                >
                  {intl.formatMessage({ id: 'wechat' })}
                </div>
                {showWeChat && (
                  <img
                    src={wechat_img}
                    alt="WeChat QR Code"
                    className="absolute top-[-9rem] left-[7rem] h-[18rem]"
                    style={{ width: 'auto', maxWidth: 'none' }}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-contents items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">{intl.formatMessage({ id: 'copyright' })}</p>
          </div>
        </div>
      </div>

      <motion.div
        className="w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary mt-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </footer>
  );
};

export default Footer;
