import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Calendar />
    </main>
    <Footer />
  </div>
);

export default App;
