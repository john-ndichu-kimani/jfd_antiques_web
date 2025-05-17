import { Button } from '../common/Button';

export const Newsletter: React.FC = () => {
  return (
    <section className="py-16 bg-amber-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold">Stay Connected</h3>
            <p className="mt-2 text-amber-100">
              Subscribe to receive updates on new acquisitions, cultural insights, and exclusive
              previews.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button className="bg-stone-900 hover:bg-stone-800 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};