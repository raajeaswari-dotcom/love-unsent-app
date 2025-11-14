
import React from 'react';

interface LegalPageProps {
    title: string;
    content: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] py-12 md:py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-black text-center mb-12">{title}</h1>
                    <div className="prose prose-lg max-w-none text-[#5B2C23]">
                        {/* In a real application, this would be populated with actual legal text */}
                        <h2>1. Introduction</h2>
                        <p>Welcome to Love Unsent. These are the terms and conditions governing your access to and use of the website Love Unsent and its related sub-domains, sites, services and tools. By accepting these terms and conditions, you agree to comply with these terms and conditions.</p>
                        
                        <h2>2. User Agreement</h2>
                        <p>You agree that you are responsible for your own use of the services, for any posts you make, and for any consequences thereof. You agree that you will use the services in compliance with all applicable local, state, national, and international laws, rules and regulations.</p>

                        <h2>3. Privacy</h2>
                        <p>Our Privacy Policy explains how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Love Unsent can use such data in accordance with our privacy policy.</p>

                        <p className="font-bold mt-8">{content}</p>
                        
                        <p>Last Updated: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
