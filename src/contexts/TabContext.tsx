import React, {createContext, useState} from 'react';

interface IContext {
    card: boolean;
    setCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: IContext = {
    card: true,
    setCard: () => {
    }
}

export const TabContext = createContext<IContext>(defaultContextValue)

function TabContextProvider({children}: { children: React.ReactNode }) {
    const getPage = localStorage.getItem('page');
    const page = getPage ? JSON.parse(getPage) : true;
    const [card, setCard] = useState<boolean>(page);
    return (
        <TabContext.Provider value={{card, setCard}}>
            {children}
        </TabContext.Provider>
    );
}

export default TabContextProvider;