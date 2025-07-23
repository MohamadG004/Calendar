import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Calendar />
      </main>
      <Footer />
    </>
  );
};
export default App;