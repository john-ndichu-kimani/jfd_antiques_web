import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ShoppingCart } from 'lucide-react';
import { Button } from '../common/Button';
import { navigation } from '@/lib/data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-stone-900/50" onClick={onClose} />
          <div className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <span className="text-lg font-semibold text-amber-900">Menu</span>
              <button onClick={onClose}>
                <X size={24} className="text-stone-700" />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name} className="py-2">
                    {item.children ? (
                      <>
                        <p className="font-medium text-stone-800 mb-2">{item.name}</p>
                        <ul className="pl-4 space-y-2">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <a href={`/collections?category=${child.href}`} className="text-stone-600 hover:text-amber-800">
                                {child.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <a href={item.href} className="font-medium text-stone-800 hover:text-amber-800">
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-stone-200">
              <div className="flex justify-between mb-4">
                <button className="flex items-center gap-2 text-stone-700 hover:text-amber-800">
                  <User size={20} />
                  <span>Account</span>
                </button>
                <button className="flex items-center gap-2 text-stone-700 hover:text-amber-800">
                  <ShoppingCart size={20} />
                  <span>Cart (0)</span>
                </button>
              </div>
              <Button primary className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};