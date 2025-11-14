

import React from 'react';
import { PencilIcon, HeartIcon, EnvelopeIcon } from './Icons';

interface HowItWorksStepProps {
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ title, description, Icon }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      <div 
        className="w-32 h-32 rounded-full mb-6 shadow-md bg-[#5B2C23] flex items-center justify-center"
        aria-hidden="true"
      >
        <Icon className="w-16 h-16 text-[#F5EADF]" />
      </div>
      <h4 className="text-xl font-semibold text-[#5B2C23] mb-2">{title}</h4>
      <p className="text-[#5B2C23]">{description}</p>
    </div>
  );
}

const HowItWorks: React.FC = () => {
  const steps = [
    { 
      title: "You write your words", 
      description: "Write a letter for the person",
      Icon: PencilIcon
    },
    { 
      title: "We craft with love", 
      description: "Each letter is handwritten with care",
      Icon: HeartIcon
    },
    { 
      title: "Delivered to the person", 
      description: "We deliver to the receiver",
      Icon: EnvelopeIcon
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#E9CBA7] py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-subheading text-[#5B2C23] mb-20">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-16">
          {steps.map(step => <HowItWorksStep key={step.title} {...step} />)}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;