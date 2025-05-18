import React from 'react';

const Gallery = () => {
  // Placeholder images for African antiques (replace with actual JFD collection images)
  const antiques = [
    {
      src: '/images/gallery/gallery6.jpg',
  
    },
    {
      src: '/images/gallery/gallery5.jpg',
     
    },
    {
      src: '/images/gallery/gallery4.jpg',
   
    },
    {
      src: '/images/gallery/gallery1.jpg',
 
    },
    {
      src: '/images/gallery/gallery2.jpg',

    },
    {
      src: '/images/gallery/gallery3.jpg',

    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Gallery</h1>
         
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {antiques.map((antique, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
            >
              <img
                src={antique.src}
                alt="gallery image"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;