import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import './App.css';

const App = () => {
  return (
    <>
    <header>Calendar</header>
    <main>
      <Calendar />
    </main>
    <footer>© 2025 Mohamad Ghattas</footer>
  </>

  );
};

export default App;
