
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-[#D79A79] py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#2C1B13]">Newsletter Signup</h2>
        <p className="text-[#2C1B13] mt-2 mb-8 max-w-md mx-auto">
          Subscribe today! Get the latest news and stay updated about our new products and special offers.
        </p>
        <form className="flex justify-center items-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your email..."
            className="w-full bg-transparent border border-black rounded-full py-3 px-6 text-black placeholder:text-[#2C1B13] focus:outline-none focus:ring-2 focus:ring-[#511317]"
          />
          <button
            type="submit"
            className="bg-[#511317] text-white font-bold py-3 px-8 rounded-full -ml-16 hover:bg-opacity-90 transition-all duration-300"
          >
            Enter
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;