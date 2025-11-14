
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F5EADF] text-[#5B2C23] py-12 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-black">Our Story</h1>
            <p className="mt-4 text-xl text-[#8C6653]">The Enduring Power of the Handwritten Word</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <img 
              src="https://images.pexels.com/photos/4145146/pexels-photo-4145146.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="A person carefully writing a letter at a wooden desk."
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
            <div className="prose prose-lg text-[#5B2C23]">
              <p>
                In a world of fleeting digital messages and instant notifications, we felt something profound was being lost: the simple, tangible act of connection. A handwritten letter is more than just words; it's a piece of the sender's heart, a moment of their time, and a keepsake to be treasured forever.
              </p>
              <p>
                <strong>Love Unsent</strong> was born from this belief. We are a small team of passionate calligraphers, writers, and hopeless romantics dedicated to reviving the art of the handwritten letter.
              </p>
            </div>
          </div>

          <div className="text-center bg-white/60 p-10 rounded-2xl">
            <h2 className="text-3xl font-bold font-subheading mb-4">Our Mission</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Our mission is to bridge distances and deepen connections through the timeless medium of handwritten correspondence. We believe every story deserves to be told with intention and care, and every heartfelt emotion deserves to be felt in the palm of a hand. We handle your words with the reverence they deserve, ensuring they arrive not just as a message, but as a memorable experience.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
