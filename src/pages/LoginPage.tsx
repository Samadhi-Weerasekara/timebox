import {Mail, Lock} from "lucide-react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Signup} from "./SignUp.tsx";


export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        // Simulate a successful login
        if (email === "sami@gmail.com" && password === "1234") {
            navigate("/dashboard"); // Navigate to the dashboard on successful login
        } else {
            alert("Invalid credentials");
        }
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
                    />                    <h1 className="text-4xl font-bold mb-2">Welcome to TimeBox</h1>
                    <p className="text-gray-600">
                        Don't have an account?{""}
                        <a href="#" className="text-blue-600 hover:text-blue-700" onClick={Signup}>
                            Sign up
                        </a>
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    {/*<div className="space-y-2">*/}
                    {/*    <label className="block text-sm font-medium text-gray-700">*/}
                    {/*        Name*/}
                    {/*    </label>*/}
                    {/*    <div className="relative">*/}
                    {/*        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">*/}
                    {/*            <Lock className="h-5 w-5 text-gray-400"/>*/}
                    {/*        </div>*/}
                    {/*        <input*/}
                    {/*            type="name"*/}
                    {/*            value={name}*/}
                    {/*            onChange={(e) => setName(e.target.value)}*/}
                    {/*            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"*/}
                    {/*            placeholder="Enter your name"*/}
                    {/*            required*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400"/>
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
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400"/>
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
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#31313B] text-white py-2 px-4 rounded-lg hover:bg-[#3F314A] transition-colors"
                    >
                        Log in
                    </button>
                </form>
            </div>

            {/* Right side - Image and Text */}
            <div className="hidden md:block flex-1">
                <div className="h-screen ">
                    <img
                        src="src/assets/image2.jpg" // Replace with your image path
                        alt="Illustration"
                        className="w-fit h-full object-cover p-4"
                    />
                </div>
            </div>
        </div>
    );
};