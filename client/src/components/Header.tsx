import React from 'react';

import '../css/Header.css';

interface HeaderPropsTypes {
  title?: string;
}

const Header = ({ title }: HeaderPropsTypes) => {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: 'Template for Typescript-React App',
};

export default Header;
