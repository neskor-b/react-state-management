import React from 'react';
import store from 'apps/Mobx/store';

export const StoreContext = React.createContext(store);

const StoreProvider = ({ children }: { children: React.ReactNode }) => (
    <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
);

export default StoreProvider;
