'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
    const [searchInput, setSearchInput ] = useState('');
    const [filter, setFilter] = useState('name');

    return (
        <AppContext.Provider value={{ searchInput, setSearchInput, filter, setFilter }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };