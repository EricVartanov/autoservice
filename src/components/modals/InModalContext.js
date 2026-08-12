'use client';

import {createContext, useContext} from 'react';

const InModalContext = createContext(false);

export function InModalProvider({children, value = true}) {
    return (
        <InModalContext.Provider value={value}>
            {children}
        </InModalContext.Provider>
    );
}

export function useInModal() {
    return useContext(InModalContext);
}
