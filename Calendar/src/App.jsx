import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import './App.css';

const App = () => {
  return (
    <>
    <header>My Calendar App</header>
    <main>
      <Calendar />
    </main>
    <footer>© 2025 Your Name</footer>
  </>

  );
};

export default App;
