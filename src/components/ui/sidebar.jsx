
import React, { createContext, useContext, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

const SidebarContext = createContext({
  expanded: false,
  setExpanded: () => {},
  mobileExpanded: false,
  setMobileExpanded: () => {},
});

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <SidebarContext.Provider
      value={{
        expanded: isMobile ? mobileExpanded : expanded,
        setExpanded,
        mobileExpanded,
        setMobileExpanded,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
