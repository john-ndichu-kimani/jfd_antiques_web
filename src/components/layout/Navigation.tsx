import { Search, User, ShoppingCart } from 'lucide-react';
import { Dropdown } from '../common/Dropdown';
import { navigation } from '@/lib/data/navigation';

export const Navigation: React.FC = () => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      <nav className="flex items-center space-x-8">
        {navigation.map((item) => (
          item.children ? (
            <Dropdown key={item.name} label={item.name} items={item.children} />
          ) : (
            <a
              key={item.name}
              href={item.href}
              className="text-stone-700 hover:text-amber-800 transition-colors"
            >
              {item.name}
            </a>
          )
        ))}
      </nav>
      <div className="flex items-center space-x-6">
       
   
        <button className="relative text-stone-700 hover:text-amber-800">
          <ShoppingCart size={20} />
          <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    </div>
  );
};