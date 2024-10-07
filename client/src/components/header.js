import React, { useState } from 'react';

const Header = ({ onSearchButtonClick, user, onLogout }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClickInternal = () => {
    onSearchButtonClick(searchInput);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearchButtonClick(searchInput);
    }
  };

  return (
    <header style={headerStyle}>
      <div>
      <img src="./images/logo.jpeg" alt="Logo" style={logoStyle} />
      </div>
      <nav style={navStyle}>
        {user ? (
          <button onClick={onLogout} style={buttonStyle}>
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              window.location.href = '/Login';
            }}
            style={buttonStyle}
          >
            Login
          </button>
        )}
      </nav>
      {user && (
        <div style={searchContainerStyle}>
          
          <input
            type="text"
            placeholder="Type the keyword for news"
            style={inputStyle}
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleEnterKeyPress} 
          />
        </div>
      )}
    </header>
  );
};

// Rest of the styles and export remain unchanged



const headerStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navStyle = {
  display: 'flex',
  gap: '10px',
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};
const logoStyle = {
  width: '150px', // Adjust the width as needed
  height: '40px', // Adjust the height as needed
  marginRight: '10px', // Adjust the margin as needed
};

const inputStyle = {
  padding: '8px',
  border: 'none',
  borderRadius: '4px',
};

const buttonStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  fontSize: '18px',
  fontFamily: 'Roboto, sans-serif',
};


export default Header;