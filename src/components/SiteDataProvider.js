'use client';

import {createContext, useContext} from 'react';

const SiteDataContext = createContext(null);

export function SiteDataProvider({value, children}) {
    return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
    const ctx = useContext(SiteDataContext);
    if (!ctx) {
        throw new Error('useSiteData must be used within SiteDataProvider');
    }
    return ctx;
}
