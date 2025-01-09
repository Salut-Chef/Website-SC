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
    <div>
      <Header />
      <div className="container mx-auto mt-10 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div>
                <ul className="flex justify-center mb-6 border-b border-gray-200">
                  <li className="mr-4">
                    <button
                      className={`px-4 py-2 text-sm font-medium ${activeTab === "login"
                        ? "text-blue-500 border-b-2 border-blue-500"
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
                        ? "text-blue-500 border-b-2 border-blue-500"
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
                {/* Login Tab */}
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
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                )}

                {/* Register Tab */}
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
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
