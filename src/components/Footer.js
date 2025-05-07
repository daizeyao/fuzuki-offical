import React from 'react';
import { motion } from 'framer-motion';
import { TAOBAO_URL, DOUYIN_URL } from '@/constants';

const wechat_img = require('@/assets/wechat.png');

const Footer = () => {
  const [showWeChat, setShowWeChat] = React.useState(false);

  return (
    <footer className="bg-primary dark:bg-gray-900 text-white pt-16 pb-8" id="footer">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-secondary">富崎</span>
              <span className="text-white">Fuzuki</span>
            </h3>
            <p className="text-gray-300 mb-6">我们致力于为客户提供最佳解决方案，帮助企业实现数字化转型。</p>
            <div className="flex space-x-4">
              {/* <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                <i className="fab fa-instagram"></i>
              </a> */}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">公司</h4>
            <ul className="flex flex-col space-y-2">
              <li><a href="/#about" className="text-gray-300 hover:text-secondary transition-colors">关于我们</a></li>
              <li><a href="/#products" className="text-gray-300 hover:text-secondary transition-colors">产品</a></li>
              <li><a href="/#features" className="text-gray-300 hover:text-secondary transition-colors">功能</a></li>
              <li><a href="/#services" className="text-gray-300 hover:text-secondary transition-colors">服务</a></li>
              <li><a href="/#faq" className="text-gray-300 hover:text-secondary transition-colors">常见问题</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">更多</h4>
            <ul className="flex flex-col space-y-2">
              <li><a href={TAOBAO_URL} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors">淘宝店铺</a></li>
              <li><a href={DOUYIN_URL} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors">抖音账号</a></li>
              <li><a href="/products-show" className="text-gray-300 hover:text-secondary transition-colors">商品展示</a></li>
              {/* <li><a href="#services" class</li>Name="text-gray-300 hover:text-secondary transition-colors">UI/UX设计</a></li>
              <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">咨询服务</a></li>
              <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">维护支持</a></li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <ul className="flex flex-col space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">江苏省常州市天宁区博爱路121号金桥大厦1202室</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">+86 13961210199</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">hongdian@126.com</span>
              </li>
              <li className="flex items-start relative">
                <i className="fas fa-comments mt-1 mr-3 text-secondary"></i>
                <div className="text-gray-300 hover:text-secondary transition-colors cursor-pointer"
                  onMouseEnter={() => setShowWeChat(true)}
                  onMouseLeave={() => setShowWeChat(false)}>企业微信</div>
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
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Fuzuki. 保留所有权利</p>
            {/* <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-secondary text-sm transition-colors">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-secondary text-sm transition-colors">服务条款</a>
              <a href="#" className="text-gray-400 hover:text-secondary text-sm transition-colors">Cookie 设置</a>
            </div> */}
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