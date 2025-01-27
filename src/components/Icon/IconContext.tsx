import React, { createContext, useContext } from 'react';

interface IconContextType {
  baseUrl: string;
}

const IconContext = createContext<IconContextType>({
  baseUrl: '/assets/icons',
});

export const IconProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IconContext.Provider value={{ baseUrl: '/assets/icons' }}>
      {children}
    </IconContext.Provider>
  );
};

export const useIconContext = () => useContext(IconContext);

export default IconContext; 