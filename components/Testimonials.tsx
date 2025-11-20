import React, { useState, useEffect } from 'react';
import type { Testimonial } from '../App';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from './Icons';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length < 2) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-[#8C6653] py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-subheading text-[#F5EADF] mb-16">
          Words from the Heart
        </h2>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
            <button onClick={goToPrevious} className="p-2 rounded-full bg-[#F5EADF]/20 hover:bg-[#F5EADF]/40 transition-colors" aria-label="Previous testimonial">
              <ChevronLeftIcon className="h-8 w-8 text-[#F5EADF]" />
            </button>
          </div>
          
          <div className="bg-[#F5EADF]/80 p-8 md:p-12 rounded-2xl shadow-lg transition-all duration-500 ease-in-out min-h-[300px] flex flex-col justify-center">
            <QuoteIcon className="w-12 h-12 text-[#5B2C23] opacity-20 mb-6 mx-auto" />
            <p className="text-xl md:text-2xl italic text-[#5B2C23]">
              "{currentTestimonial.quote}"
            </p>
            <p className="font-bold text-lg text-right text-[#5B2C23] mt-8">- {currentTestimonial.author}</p>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
            <button onClick={goToNext} className="p-2 rounded-full bg-[#F5EADF]/20 hover:bg-[#F5EADF]/40 transition-colors" aria-label="Next testimonial">
              <ChevronRightIcon className="h-8 w-8 text-[#F5EADF]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;