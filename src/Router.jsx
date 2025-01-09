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
  }
])

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}