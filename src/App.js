import React from 'react';
import CloudBackground from './components/CloudBackground';
import Logo from './components/Logo';
import EmailForm from './components/Email';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden bg-white font-cormorant">
      <CloudBackground />
      
      <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
        <Logo />
        <EmailForm />
        <Footer />
      </div>
    </div>
  );
}

export default App;