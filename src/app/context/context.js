'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
    const [searchInput, setSearchInput ] = useState('');

    return (
        <AppContext.Provider value={{ searchInput, setSearchInput }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };