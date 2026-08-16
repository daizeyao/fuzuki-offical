import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntl } from 'umi';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, onConfirm, title, description }) => {
  const intl = useIntl();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{description}</p>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {intl.formatMessage({ id: 'modal.cancel' })}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
              >
                {intl.formatMessage({ id: 'modal.confirm' })}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFModal;
