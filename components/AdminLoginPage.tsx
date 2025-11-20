
import React, { useState } from 'react';
import type { User } from '../App';

interface AdminLoginPageProps {
    onLoginSuccess: (adminUser: User) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('https://love-unsent-app-final-backend.onrender.com/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('adminToken', data.token);
                
                const adminUser: User = {
                    id: data._id,
                    email: data.email,
                    name: data.name,
                    isAdmin: true,
                    joinedDate: new Date().toLocaleDateString(),
                    mobile: '',
                    address: { flat: '', street: '', city: '', state: '', zip: '' },
                    notes: 'Site Administrator',
                };
                onLoginSuccess(adminUser);
            } else {
                const data = await response.json();
                setError(data.message || 'Invalid credentials or not an admin.');
            }
        } catch (err) {
            console.error("Login fetch error:", err);
            setError('Login failed. Could not connect to the server. Please ensure the backend is running and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen flex items-center justify-center p-4">
            <div className="flex w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Left side with Image */}
                <div className="hidden md:block md:w-1/2 relative">
                    <img
                        src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="A team working in a creative office space"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5B2C23] to-transparent opacity-70"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="font-display text-4xl font-bold">Love Office</h2>
                        <p className="mt-2 text-lg">Where every word finds its way.</p>
                    </div>
                </div>

                {/* Right side with Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="font-display text-3xl font-black mb-2 text-center md:text-left">Administrator Login</h1>
                    <p className="text-center md:text-left text-sm mb-8 text-[#8C6653]">Access your store dashboard.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email-admin" className="sr-only">Email</label>
                            <input
                                id="email-admin"
                                type="email"
                                name="email"
                                placeholder="admin@loveunsent.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-admin" className="sr-only">Password</label>
                            <input
                                id="password-admin"
                                type="password"
                                name="password"
                                placeholder="admin"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                            />
                        </div>
                        {error && <p className="text-red-600 font-bold text-center pt-2">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#5B2C23] text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] text-lg disabled:bg-opacity-70 disabled:cursor-wait"
                            >
                                {isLoading ? 'Logging In...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;