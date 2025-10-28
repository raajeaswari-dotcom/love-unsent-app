

import React from 'react';

interface HowItWorksStepProps {
  title: string;
  description: string;
  bgColor: string;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ title, description, bgColor }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      <div 
        className="w-32 h-32 rounded-full mb-6 shadow-md"
        style={{ backgroundColor: bgColor }}
        aria-hidden="true"
      ></div>
      <h4 className="text-xl font-semibold text-[#2C1B13] mb-2">{title}</h4>
      <p className="text-[#2C1B13]">{description}</p>
    </div>
  );
}

const HowItWorks: React.FC = () => {
  const steps = [
    { 
      title: "You write your words", 
      description: "Write a letter for the person",
      bgColor: "#511317"
    },
    { 
      title: "We craft with love", 
      description: "Each letter is handwritten with care",
      bgColor: "#511317"
    },
    { 
      title: "Delivered to the person", 
      description: "We deliver to the receiver",
      bgColor: "#511317"
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#DBCDBE] py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold text-[#2C1B13] mb-20">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-16">
          {steps.map(step => <HowItWorksStep key={step.title} {...step} />)}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;