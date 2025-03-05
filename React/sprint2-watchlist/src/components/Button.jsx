import React from 'react';

const Button = ({ children, onClick, style = 'primary' }) => {
  const styles = {
    primary: 'bg-button-primary hover:bg-button-primary-hover active:bg-button-primary-active text-dark-secondary',
    secondary: 'bg-button-secondary hover:bg-button-secondary-hover active:bg-button-secondary-active text-text-primary'
  };

  return (
    <button 
      onClick={onClick} 
      className={`${styles[style]} py-2 px-4 rounded-md w-full font-semibold transition-colors duration-300`}>
      {children}
    </button>
  );
};

export default Button;
