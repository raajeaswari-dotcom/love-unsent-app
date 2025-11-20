import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from './Icons';

const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setFeedback({ type: '', message: '' });

        // Mock form submission
        setTimeout(() => {
            if (formState.name && formState.email && formState.subject && formState.message) {
                setFeedback({ type: 'success', message: "Thank you for your message! We'll get back to you soon." });
                setFormState({ name: '', email: '', subject: '', message: '' });
            } else {
                setFeedback({ type: 'error', message: 'Please fill out all fields before sending.' });
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] py-12 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl md:text-6xl font-black">Get in Touch</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-[#8C6653]">
                        Have a question, a special request, or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold font-subheading border-b-2 border-[#E9CBA7] pb-4">Contact Information</h2>
                        <div className="flex items-start gap-4">
                            <MailIcon className="w-6 h-6 mt-1 text-[#8C6653]" />
                            <div>
                                <h3 className="font-bold text-lg">Email Us</h3>
                                <p className="text-[#8C6653]">Our inbox is always open for your inquiries.</p>
                                <a href="mailto:contact@loveunsent.in" className="text-[#5B2C23] font-semibold hover:underline">contact@loveunsent.in</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <PhoneIcon className="w-6 h-6 mt-1 text-[#8C6653]" />
                            <div>
                                <h3 className="font-bold text-lg">Call Us</h3>
                                <p className="text-[#8C6653]">Speak with our friendly team during business hours.</p>
                                <a href="tel:+910000000000" className="text-[#5B2C23] font-semibold hover:underline">+91 00000 00000</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <MapPinIcon className="w-6 h-6 mt-1 text-[#8C6653]" />
                            <div>
                                <h3 className="font-bold text-lg">Our Studio</h3>
                                <p className="text-[#8C6653]">123, Calligraphy Lane,<br />Artsy City, 400001, IN</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]">
                        <h2 className="text-3xl font-bold font-subheading mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                             <input type="text" name="name" placeholder="Full Name *" value={formState.name} onChange={handleChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                             <input type="email" name="email" placeholder="Email Address *" value={formState.email} onChange={handleChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                             <input type="text" name="subject" placeholder="Subject *" value={formState.subject} onChange={handleChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                             <textarea name="message" placeholder="Your Message *" value={formState.message} onChange={handleChange} rows={5} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required></textarea>
                             <div className="pt-2">
                                <button type="submit" disabled={isLoading} className="w-full bg-[#5B2C23] text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] text-lg disabled:bg-opacity-70">
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </button>
                             </div>
                             {feedback.message && (
                                <p className={`text-center font-semibold ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                    {feedback.message}
                                </p>
                             )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;