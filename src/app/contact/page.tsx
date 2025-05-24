'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Metadata } from 'next';
import { 
  Mail, 
  Send, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// export const metadata = {
//   title: 'Contact | African Art Heritage',
//   description: 'Connect with JFD African Art Heritage. Reach out with inquiries about our curated African art collection, schedule a visit, or share your thoughts.',
// };

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/jfdafricanart' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/jfdafricanart' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/jfdafricanart' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/jfdafricanart' },
];

const contactDetails = [
  { 
    icon: Mail, 
    title: 'Email Us', 
    details: 'jfd@africanartheritage.com', 
    link: 'mailto:jfd@africanartheritage.com',
    description: 'For general inquiries and information'
  },
  { 
    icon: Phone, 
    title: 'Call Us', 
    details: '+1 (234) 567-8910', 
    link: 'tel:+12345678910',
    description: 'Available Monday-Friday, 9am-5pm'
  },
  { 
    icon: MapPin, 
    title: 'Visit Us', 
    details: '123 Art Gallery Lane, New York, NY 10001', 
    link: 'https://maps.google.com/?q=123+Art+Gallery+Lane+New+York+NY+10001',
    description: 'Our gallery is open to the public'
  },
  { 
    icon: Clock, 
    title: 'Hours', 
    details: 'Tue-Sun: 10am-6pm | Mon: Closed', 
    link: null,
    description: 'Private viewings available by appointment'
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subject: '',
    message: '',
    interest: 'General Inquiry'
  });
  const [formStatus, setFormStatus] = useState(null); // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Failed to submit form');
      
    //   setFormStatus('success');
      console.log('Form submitted:', formData);
      
      // Optional: Reset form after successful submission
      // setFormData({ name: '', email: '', phone: '', subject: '', message: '', interest: 'General Inquiry' });
    } catch (error) {
      console.error('Form submission error:', error);
    //   setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <div className=" text-stone-700">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-amber-800">
              Connect with JFD African Art Heritage for inquiries, visits, or to share your passion for African art.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">


          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Send Us a Message</h2>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800">Message Sent Successfully!</h3>
                  <p className="text-green-700 mt-2">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => {
                      setFormStatus(null);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '', interest: 'General Inquiry' });
                    }}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : formStatus === 'error' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-6">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-red-800">Something Went Wrong</h3>
                  <p className="text-red-700 mt-2">We couldn't send your message. Please try again or contact us directly.</p>
                  <button 
                    onClick={() => setFormStatus(null)}
                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-stone-700 font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-stone-700 font-medium mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-stone-700 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-stone-700 font-medium mb-2">
                        I'm Interested In
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Art Purchase">Art Purchase</option>
                        <option value="Gallery Visit">Gallery Visit</option>
                        <option value="Private Viewing">Private Viewing</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Press/Media">Press/Media</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-stone-700 font-medium mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-stone-700 font-medium mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
                      required
                    />
                    <label htmlFor="consent" className="ml-3 text-sm text-stone-600">
                      I agree to the <a href="/privacy-policy" className="text-amber-600 hover:underline">privacy policy</a> and consent to being contacted regarding my inquiry.
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* FAQ Preview */}
             {/* FAQ Preview */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    { q: "What types of Antiques do you have in your collection?", a: "My collection spans 50 years of acquiring African art, primarily from Central and East Africa, including masks (mostly Lega), museum-quality statues and figures, and everyday objects from traditional village life." },
                    { q: "How do you verify authenticity?", a: "Having collected for decades, I've learned to distinguish genuine pieces from later copies. Many items show natural wear from age and use, unlike artificially 'aged' reproductions." },
                    { q: "Do you ship internationally?", a: "Yes, I can arrange insured shipping worldwide. Each piece will be carefully packed to ensure safe delivery." },
                    { q: "Can I see the collection in person?", a: "As I am retired and based in Kenya, physical viewings may be possible by appointment for serious inquiries." }
                  ].map((faq, i) => (
                    <div key={i} className="border-b border-stone-200 pb-3 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-stone-800 mb-1">{faq.q}</h4>
                      <p className="text-stone-600 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
             
              </div>

             

              {/* Social Media Links */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Connect With Us</h3>
                <div className="flex justify-around">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center"
                    >
                      <div className="bg-amber-50 hover:bg-amber-100 p-3 rounded-full transition-colors">
                        <social.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <span className="text-xs text-stone-600 mt-2">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>



          {/* Testimonials */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-stone-800 text-center mb-8">What Our Clients Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Art Collector",
                  quote: "JFD's knowledge of African Antiques is unparalleled. He helped me find the perfect piece for my collection with personalized service."
                },
                {
                  name: "Michael Thompson",
                  role: "Interior Designer",
                  quote: "Working with JFD has been a pleasure. His curated selection brings authentic African artistry to our design projects."
                }
    
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-amber-400">
                      {'★'.repeat(5)}
                    </div>
                    <blockquote className="text-stone-600 italic mb-4 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-stone-800">{testimonial.name}</p>
                      <p className="text-stone-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
          
          {/* Call to Action */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Ready to Explore JFD African Antiques?</h2>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Whether you're looking to start your collection, enhance your space with authentic African Antiques, 
              or simply learn more about our pieces, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/gallery" 
                className="bg-amber-600 text-white py-3 px-8 rounded-md hover:bg-amber-700 transition-colors"
              >
                Explore Our Collection
              </a>
              <a 
                href="/about" 
                className="bg-white border border-amber-600 text-amber-600 py-3 px-8 rounded-md hover:bg-amber-50 transition-colors"
              >
                Learn About JFD
              </a>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}