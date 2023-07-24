import React, { useState, useEffect } from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(35, 138, 240, 0.4)',
            color: 'white',
            fontSize: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            border: 'none', 
            outline: 'none', 
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', 
            transition: 'background-color 0.3s', 
          }}
          
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(35, 138, 240)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(35, 138, 240, 0.4)';
          }}
        >
          <KeyboardDoubleArrowUpIcon />
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;