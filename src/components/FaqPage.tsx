
import React from 'react';

interface FaqItemProps {
    question: string;
    children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => (
    <details className="border-b border-[#E9CBA7] py-4 group">
        <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none">
            {question}
            <span className="text-[#8C6653] transition-transform duration-300 transform group-open:rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </span>
        </summary>
        <div className="mt-4 text-[#5B2C23]/90">
            {children}
        </div>
    </details>
);

const FaqPage: React.FC = () => {
    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] py-12 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl md:text-6xl font-black">Frequently Asked Questions</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-[#8C6653]">
                        Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <FaqItem question="How long does delivery take?">
                        <p>Standard delivery within India typically takes 5-7 business days. Express delivery takes 2-3 business days. Please note that the writing and crafting process adds 1-2 days before your letter is shipped.</p>
                    </FaqItem>
                    <FaqItem question="Do you ship internationally?">
                        <p>Currently, we only ship within India. We are working on expanding our services to international destinations in the near future!</p>
                    </FaqItem>
                    <FaqItem question="Is the content of my letter kept private?">
                        <p>Absolutely. Your privacy is our utmost priority. Our professional writers handle your words with the highest level of confidentiality and respect. All digital copies of your messages are permanently deleted after the letter is written and dispatched.</p>
                    </FaqItem>
                    <FaqItem question="What kind of paper and ink do you use?">
                        <p>We use high-quality, premium paper options like Classic Laid, Parchment, and Linen to give your letter a luxurious feel. We use high-grade fountain pen inks, typically in classic blue, black, or red, to ensure a beautiful and lasting impression.</p>
                    </FaqItem>
                    <FaqItem question="What is the 'Unsent Letter' service?">
                        <p>The Unsent Letter is a therapeutic service for you to express your thoughts and feelings without the intention of sending the letter. We will handwrite your words, seal the letter, and mail it to YOU as a keepsake. It's a powerful tool for closure, reflection, or self-expression.</p>
                    </FaqItem>
                    <FaqItem question="Can I cancel my order or get a refund?">
                        <p>You can cancel your order within 2 hours of placing it for a full refund. As each letter is a highly personalized and custom-made item, we cannot offer refunds once our writers have begun the crafting process. If you are unsatisfied with your order for any reason, please contact our support team, and we will do our best to make it right.</p>
                    </FaqItem>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
