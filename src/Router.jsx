import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile.jsx"
import About from "./pages/About";
import Auth from "./components/auth";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import Contact from "./pages/Contact.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import LegalMentions from "./pages/LegalMentions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/loginsignup",
    element: <LoginSignup />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: '/:id',
    element: <RecipeDetails />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/admin',
    element: <AdminDashboard />
  },
  {
    path: '/admin/create',
    element: <CreateRecipe />
  },
  {
    path: '/mentions',
    element: <LegalMentions />
  },
  {
    path: '/policy',
    element: <PrivacyPolicy />
  }
])

export default function Router() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}