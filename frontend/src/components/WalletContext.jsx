import { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(0);

  // const toggleTheme = () =>
  //   setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <WalletContext.Provider value={{ setWallet, wallet }}>
      {children}
    </WalletContext.Provider>
  );
};
