import { Search, User, ShoppingCart } from 'lucide-react';
import { Dropdown } from '../common/Dropdown';
import { navigation } from '@/lib/data/navigation';

export const Navigation: React.FC = () => {
  return (
    <nav className="py-2">
      {/* Main navigation links centered */}
      <div className="flex items-center justify-center space-x-8">
        {navigation.map((item) => (
          item.children ? (
            <Dropdown key={item.name} label={item.name} items={item.children} />
          ) : (
            <a
              key={item.name}
              href={item.href}
              className="text-stone-200 hover:text-amber-100 font-medium transition-colors"
            >
              {item.name}
            </a>
          )
        ))}
      </div>
    </nav>
  );
};