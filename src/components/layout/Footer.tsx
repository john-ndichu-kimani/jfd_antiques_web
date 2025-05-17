import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-4">African Art Heritage</h4>
            <p className="mb-6">
              A 35-year journey of preserving and sharing the rich cultural heritage
              of the Democratic Republic of Congo through authentic artifacts.
            </p>
            <div className="flex space-x-4">{/* Social icons would go here */}</div>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Explore</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  All Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Featured Artifacts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Cultural Context
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Information</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Authentication Process
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contact</h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Art Gallery Street</span>
              </li>
              <li>
                <a
                  href="mailto:info@africanartheritage.com"
                  className="hover:text-amber-500 transition-colors"
                >
                  info@jfdantiques.com
                </a>
              </li>
              <li>
                <a href="tel:+12345678900" className="hover:text-amber-500 transition-colors">
                  +1 (234) XXX XXX XXX
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 text-center">
          <p>© {new Date().getFullYear()} JFD Antiques. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};