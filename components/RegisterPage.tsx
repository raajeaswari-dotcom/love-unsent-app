import React, { useState } from 'react';

interface RegisterPageProps {
    navigate: (page: string) => void;
    onRegister: (email: string, name: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigate, onRegister }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(email, fullName);
    };

    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-12 md:py-24 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto px-4">
                <h1 className="font-display text-4xl font-black mb-8 text-center">Create Account</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#5B2C23] text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] text-lg"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                <p className="text-center mt-6">
                    Already have an account?{' '}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('login');
                        }}
                        className="font-bold text-[#8C6653] hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;