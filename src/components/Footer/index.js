import React from 'react';

const Footer = () => (
  <footer className="fixed bottom-0 w-full p-8 text-center text-sm tracking-wider opacity-0 animate-fade-in-delay-3">
    <p className="text-black/50 leading-relaxed font-light">
      © 2025 Sacred Sky
    </p>
    <p className="text-black/50 leading-relaxed font-light">
      <a href="mailto:info@sacredsky.art" 
         className="hover:text-black/70 transition-colors">
        info@sacredsky.art
      </a>
    </p>
  </footer>
);

export default Footer;