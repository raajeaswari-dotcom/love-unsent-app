
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (isLoading) return;

    setIsLoading(true);

    if (!email.trim()) {
      setError('Please enter your email address.');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
        const response = await fetch('https://love-unsent-app-final-backend.onrender.com/api/newsletter/subscribe', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(data.message || 'Thank you for subscribing!');
            setEmail('');
            setTimeout(() => setSuccess(''), 4000);
        } else {
            setError(data.message || 'Subscription failed. Please try again.');
        }

    } catch (err) {
        setError('Could not connect to the server. Please try again later.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#E9CBA7] py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-subheading text-[#5B2C23]">Newsletter Signup</h2>
        <p className="text-[#5B2C23] mt-2 mb-8 max-w-md mx-auto">
          Subscribe today! Get the latest news and stay updated about our new products and special offers.
        </p>
        <form className="flex justify-center items-center max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className={`w-full bg-transparent border rounded-xl py-3 px-6 placeholder:text-[#8C6653] focus:outline-none focus:ring-2 ${error ? 'border-red-700 ring-red-500' : 'border-[#8C6653] focus:ring-[#5B2C23]'}`}
            aria-label="Email for newsletter"
            aria-describedby="newsletter-feedback"
            aria-invalid={!!error}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#5B2C23] text-white font-bold py-3 px-8 rounded-xl -ml-16 hover:bg-opacity-90 transition-all duration-300 disabled:bg-opacity-70"
          >
            {isLoading ? '...' : 'Enter'}
          </button>
        </form>
        <div id="newsletter-feedback" className="mt-4 h-5">
            {error && <p className="text-red-800 font-bold" role="alert">{error}</p>}
            {success && <p className="text-green-800 font-bold">{success}</p>}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
