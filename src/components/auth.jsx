import React, { useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto mt-10 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div>
                <ul className="flex justify-center mb-6 border-b border-gray-200">
                  <li className="mr-4">
                    <button
                      className={`px-4 py-2 text-sm font-medium ${activeTab === "login"
                        ? "text-customRed border-b-2 border-customRed"
                        : "text-gray-500"
                        }`}
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${activeTab === "register"
                        ? "text-customRed border-b-2 border-customRed"
                        : "text-gray-500"
                        }`}
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                {activeTab === "login" && (
                  <form onSubmit={handleSignIn}>
                    {error && (
                      <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                        {error}
                      </div>
                    )}
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-customRed text-white rounded-lg hover:transform hover:shadow-[inset_2px_2px_5px_rgba(25,23,21,1)] transition-transform transition-shadow duration-[500ms] ease-in-out"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                )}
                {activeTab === "register" && (
                  <form onSubmit={handleRegister}>
                    {error && (
                      <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                        {error}
                      </div>
                    )}
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-customRed text-white rounded-lg hover:transform hover:shadow-[inset_2px_2px_5px_rgba(25,23,21,1)] transition-transform transition-shadow duration-[500ms] ease-in-out"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
