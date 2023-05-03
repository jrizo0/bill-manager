import React from 'react';
import AppBar from './AppBar';

function Layout({ children }: any) {
  return (
    <>
      <AppBar />
      <div className="App container py-3">
        {children}
      </div>
    </>
  );
}

export default Layout;

