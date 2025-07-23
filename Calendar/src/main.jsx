// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // ✅ import Tailwind styles
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./templates/sign-in/SignIn";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </BrowserRouter>
);