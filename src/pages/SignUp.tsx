import { Mail, Lock, User } from "lucide-react"; // Import User icon for the name field
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        // Basic validation
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Simulate a successful signup
        alert("Signup successful!");
        navigate("/login"); // Navigate to the login page after successful signup
    };

    return (
        <div className="flex h-screen w-screen">
            {/* Left side - Form */}
            <div className="flex-1 p-14 mr-2 ml-2">
                <div className="mb-4">
                    <img
                        src="src/assets/Time-removebg-preview.png" // Replace with your image path
                        alt="logo"
                        className="w-20 h-20 object-cover flex justify-center align-middle"
                    />
                    <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:text-blue-700">
                            Log in
                        </a>
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSignup}>
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" /> {/* User icon for name */}
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#564C80] text-white py-2 px-4 rounded-lg hover:bg-[#3F314A] transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
            </div>

            {/* Right side - Image or Video */}
            <div className="hidden md:block flex-1">
                <div className="h-screen">
                    <img
                        src="src/assets/log2.jpg" // Replace with your image path
                        alt="Illustration"
                        className="w-full h-full object-cover p-4"
                    />
                </div>
            </div>
        </div>
    );
};