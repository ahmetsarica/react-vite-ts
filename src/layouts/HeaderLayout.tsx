import React, { ReactNode } from 'react';
import Header from '../components/header/Header';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <div className='layout'>
      <Header />
      {children}
    </div>
  );
};

export default HeaderLayout;
