import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import './App.css';

const App = () => {
  return (
    <div className="app-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Calendar />
      </main>
      <Footer />
    </div>
  );
};

export default App;
