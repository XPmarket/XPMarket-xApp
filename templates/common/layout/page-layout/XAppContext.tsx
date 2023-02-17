import { createContext, FC, ReactNode, useContext } from 'react';
import { xApp } from 'xumm-xapp-sdk';

import { XAPP } from './constants';

interface ProviderProps {
  children: ReactNode;
}

export const XAppProvider: FC<ProviderProps> = ({ children }) => {
  return (
    <XAppContext.Provider
      value={{
        xApp: XAPP,
      }}
    >
      {children}
    </XAppContext.Provider>
  );
};

export interface XAppContextProps {
  xApp: xApp | undefined;
}

const XAppContext = createContext<XAppContextProps | undefined>(undefined);

export const useXApp = (): XAppContextProps => {
  const context = useContext(XAppContext);

  if (context === undefined) {
    throw new Error('useXApp must be used within an XAppProvider');
  }

  return context;
};
